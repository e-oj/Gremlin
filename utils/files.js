/**
 * @author EmmanuelOlaojo
 * @since 11/10/17
 */

let moduleId = "utils/files";

const MAX_DURATION = 20;

let fs = Promise.promisifyAll(require("fs"));
let mongoose = require("mongoose");
let ffmpegStatic = require("ffmpeg-static");
let ffprobeStatic = require("ffprobe-static");
let ffmpeg = require("fluent-ffmpeg");
let Grid = require("gridfs-stream");

let response = require("./response");
let http = require("./HttpStats");

Grid.mongo = mongoose.mongo;

ffmpeg.setFfmpegPath(ffmpegStatic.path);
ffmpeg.setFfprobePath(ffprobeStatic.path);

/**
 * Attach an image to a mongoose document
 * at the specified key.
 *
 * @param file the image to attach
 * @param doc the mongoose document
 * @param key image key in the document
 *
 * @returns {Promise.<void>}
 */
exports.attachImage = async (file, doc, key) => {
  doc[key] = {
    data: await fs.readFileAsync(file.path, "base64")
    , mimetype: file.mimetype
  };

  await fs.unlinkAsync(file.path);
};

/**
 * Takes a video that's not longer than
 * maxDuration and uploads it to the db as
 * an mp4. Not being used currently but it works.
 *
 * @param file the video file object
 * @param maxDuration max duration for a video in seconds
 *
 * @returns {Promise.<*>}
 */
exports.uploadVideo = async (file, maxDuration = MAX_DURATION) => {
  let gfs = Grid(mongoose.connection.db);

  try {
    let vid = await toMp4(file, maxDuration);
    let writeStream = gfs.createWriteStream({filename: vid.filename});
    let readStream = fs.createReadStream(vid.mp4);

    return await new Promise(function (resolve, reject) {
      writeStream.on("close", file => {
        fs.unlink(vid.mp4, err => {
          if(err) return reject(err);

          resolve(file);
        });
      });

      writeStream.on("error", reject);
      readStream.on("error", reject);

      readStream.pipe(writeStream);
    });
  }
  catch(err){
    throw err;
  }
};

/**
 * Stores the path to an mp4 version of a
 * video file in file.mp4 and resolves with the
 * file.
 *
 * @returns {Promise.<*>}
 */
let toMp4 = exports.toMp4 = (file, maxDuration = MAX_DURATION) => {
  let mpeg = ffmpeg(file.path);
  let filePath = `${file.path}.mp4`;

  return new Promise(function(resolve, reject){
    mpeg.ffprobe((err, data) => {
      if(err) return reject(err);

      if(data.format.duration > maxDuration){
        return reject(new Error(`Video too long. Max duration is ${maxDuration} seconds`));
      }

      let codec = data.streams[0].codec_name;

      if(codec === "h264"){
        file.mp4 = file.path;
        return resolve(file);
      }

      mpeg.format("mp4")
        .outputOptions("-preset ultrafast")
        .on("error", reject)
        .on("end", () => {
          fs.unlink(file.path, err => {
            if(err) return reject(err);

            file.mp4 = filePath;
            resolve(file);
          });
        })
        .save(filePath);
    });
  });
};

/**
 * Route handler for streaming files. This function
 * responds with a range of bytes from a file
 * or with the whole file if no range is specified.
 * It responds with partial content (206)
 *
 * @param req the request
 * @param res the response
 * @returns {Promise.<*>}
 */
exports.stream = async (req, res) => {
  let respondErr = response.failure(res, moduleId);
  let _id = req.query.id;
  let gfs = Promise.promisifyAll(Grid(mongoose.connection.db));

  res.status(http.PARTIAL_CONTENT);
  res.set("Accept-Ranges", "bytes");

  try{
    let file = await gfs.findOneAsync({_id});

    if(!file){return respondErr(http.NOT_FOUND, "File not found");}

    res.set("Content-Type", file.metadata.mimetype);

    let byteRange = req.range(file.length);

    if (byteRange === -1) {
      return respondErr(http.UNSATISFIABLE_RANGE, "Invalid Range");
    }
    else if (byteRange === -2 || byteRange === undefined) {
      res.set("Content-Length", `${file.length}`);
      return gfs.createReadStream({_id}).pipe(res);
    }

    if(byteRange.type !== "bytes"){
      return respondErr(http.UNSATISFIABLE_RANGE, "Bytes only, please!!");
    }

    byteRange = byteRange.shift();

    let readStream = gfs.createReadStream({
      _id
      , range: {
        startPos: byteRange.start
        , endPos: byteRange.end
      }
    });

    res.set({
      "Content_Length": (byteRange.end - byteRange.start) + 1
      , "Content-Range": `bytes ${byteRange.start}-${byteRange.end}/${file.length}`
    });

    readStream.pipe(res);
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};

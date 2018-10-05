/**
 * @author emmanuelolaojo
 * @since 7/12/18
 */

/**
 * Reads files from a given input.
 *
 * @param input - to read from
 *
 * @returns {Promise<Array>} - resolves with array of objects
 *  containing the file and what's essentially a preview url
 */
export function readFiles(input) {
  const LENGTH = input.files.length;

  let reader = new FileReader();
  let result = [];
  let count = 0;

  return new Promise(function(resolve, reject){
    let readNextFile = () => {
      while(count < LENGTH && !(/\.(jpe?g|png|gif|webp)$/i.test(input.files[count].name))){
        count++;
      }

      if(count < LENGTH) {
        reader.readAsDataURL(input.files[count]);
      }
      else{
        input.value = "";
        resolve(result);
      }
    };

    reader.addEventListener("load", () => {
      result.push({
        file: input.files[count],
        url: reader.result
      });
    });

    reader.addEventListener("loadend", () => {
      count++;
      readNextFile();
    });

    reader.addEventListener("error", () => {
      reject(reader.error);
    });

    readNextFile();
  });
}

/**
 * Escapes special characters in a string to
 * prep for usage as part of a regular expression.
 *
 * @param string - to be escaped
 *
 * @return {String} - escaped string
 */
export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


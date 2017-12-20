/**
 * @author EmmanuelOlaojo
 * @since 12/29/16
 */

//todo: add check for error status code
function failure(res, moduleId){
  if(!moduleId) throw new Error("Missing moduleId!!!!!");

  return function(status, message, error){
    if(!status) throw new Error("Missing status!!!!!");

    message = message || "OOPS!!! something went wrong!";

    res.status(status);

    res.json({
      success: false
      , message: moduleId + ": " + message
      , error: error || {message}
    });
  };
}

function success(res){

  return function(status, message, result){
    if(!status) throw new Error("Missing status!!!!!");

    res.status(status);

    res.json({
      success: true
      , message: message
      , result: result || {message}
    });
  };
}

module.exports = {
  failure: failure
  , success: success
};
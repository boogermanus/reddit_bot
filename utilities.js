const fs = require('fs');

let getSubmissionJSON = function(submission) {
    let json = {
        id:submission.id,
        title:submission.title,
        URL:submission.url
    };

    return json;
}

let logSubmissionJSON = function(submission) {
    let logEntry = "";
    for(entry in submission) {
        logEntry += submission[entry] + ":";
    }

    return logEntry.slice(0, -1);
}

let logWatchJSON = function(watch,submission) {
    let logEntry = "Found \"" + watch + "\" in ";
    for(entry in submission) {
        logEntry += submission[entry] + ":"
    }

    return logEntry.slice(0,-1);
}

let loadFile = function(fileName) {
    return fs.readFileSync(fileName).toString().split('\n');
}

module.exports =
{
    getSubmissionJSON:getSubmissionJSON,
    logSubmissionJSON:logSubmissionJSON,
    logWatchJSON:logWatchJSON,
    loadFile:loadFile
};
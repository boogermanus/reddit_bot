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

module.exports =
{
    getSubmissionJSON:getSubmissionJSON,
    logSubmissionJSON:logSubmissionJSON
};
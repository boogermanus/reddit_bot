var getDisplay = function(user, data) {
    return "u/" + user.user + ": " + data.subreddit_name_prefixed + " -> " + data.title;
};

var reportRecentUpvotes = function(data, user, callback) {
    var upvotes = user.previousUpvotes;

    if(user.previousUpvotes.length == 0) {
        user.addUpvotes(data);
        for(upvote of upvotes) {
            callback(user, upvote);
        }
    }
    else {
        for(upvote of data) {
            if(user.addUpvote(upvote)) {
                callback(user, upvote);
            }
        }
    }
};

module.exports = {
    getDisplay: getDisplay,
    reportRecentUpvotes: reportRecentUpvotes
};
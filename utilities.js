var getDisplay = function(user, data) {
    return "u/" + user.user + ":" + data.subreddit_name_prefixed + " -> " + data.title;
};

var reportRecentUpvotes = function(data, user, callback) {
    if(user.previousUpvotes.length == 0) {
        user.addUpvotes(data);
        var upvotes = user.previousUpvotes;
        for(upvote of upvotes) {
            callback(user, upvote);
        }
    }
    else {
        for(upvoted of data) {
            if(user.addUpvote(upvoted)) {
                callback(user, upvote);
            }
        }
    }
};

module.exports = {
    getDisplay: getDisplay,
    reportRecentUpvotes: reportRecentUpvotes
};
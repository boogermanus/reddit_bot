var getDisplay = function(user, data) {
    return "u/" + user + ":" + data.subreddit_name_prefixed + " -> " + data.title;
}

module.exports = {
    getDisplay: getDisplay
}
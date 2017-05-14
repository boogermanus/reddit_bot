var getDisplay = function(data) {
    return data.subreddit_name_prefixed + " -> " + data.title;
}

module.exports = {
    getDisplay: getDisplay
}
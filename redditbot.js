var EventEmitter = require('events').EventEmitter;
var utilities = require('./utilities');
var util = require('util');
var model = require('./model');

var RedditBot = function(wrap) {
    this.snooWrap = wrap;
    this.previousUpvotes = [];
    this.users = [];
    EventEmitter.call(this);
};

RedditBot.prototype.followUpvotes = function() {
    var self = this;
    for(user of this.users ) {
        this.snooWrap.getUser(user.user).getUpvotedContent({'limit': 10 })
            .then((data) => utilities.reportRecentUpvotes(data, user, function(user, upvote)
            {
                self.emit('add', utilities.getDisplay(user, upvote));
            }));
    }
};

RedditBot.prototype.addUser = function(user) {
    //don't add the same user twice
    if(this.users.findIndex(u => u.user === user) === -1) {
        this.users.push(new model.User(user));
    }
};

RedditBot.prototype.run = function() {
    var self = this;
    this.on('add', console.log);
    this.on('interval', function() {
        this.followUpvotes();
    });

    setInterval(function() {
        self.emit('interval');
    }, 10000)
};

util.inherits(RedditBot, EventEmitter);

module.exports = {
    RedditBot: RedditBot
};
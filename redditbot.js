var EventEmitter = require('events').EventEmitter;
var utilities = require('./utilities');
var util = require('util');

var RedditBot = function(wrap) {
    this.snooWrap = wrap;
    this.previousUpvotes = [];
    EventEmitter.call(this);
};

RedditBot.prototype.followUpvotes = function(user) {
    this.snooWrap.getUser(user).getUpvotedContent({'limit': 10 })
        .then((data) => this.reportRecents(data, user));
}

RedditBot.prototype.reportRecents = function(data, user) {
    if(this.previousUpvotes.length == 0) {
        for(upvoted of data) {
            var display  = utilities.getDisplay(user, upvoted);
            this.previousUpvotes.push(display);
            this.emit('add', display);
        }
    }
    else {
        for(upvoted of data) {

            var display = utilities.getDisplay(user, upvoted);

            //is it in the list?
            if(this.previousUpvotes.findIndex(s => s === display) === -1)
            {
                //remove last item in list and add this item to top of stack
                this.previousUpvotes.splice(-1,1);
                this.previousUpvotes.splice(0,0,display);

                this.emit('add', display);
            }
        }
    }
}

RedditBot.prototype.run = function() {
    var self = this;
    this.on('add', console.log);
    this.on('interval', function() {
        this.followUpvotes("boogermanus");
    });

    setInterval(function() {
        self.emit('interval');
    }, 10000)
}

util.inherits(RedditBot, EventEmitter);

module.exports = {
    RedditBot: RedditBot
};
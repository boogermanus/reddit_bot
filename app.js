var snoowrap = require('snoowrap');
var EventEmitter = require('events');

var r = new snoowrap({
    userAgent: 'Boogermanus Bot',
    clientId: 'Zw-2dqyeVwabwg',
    clientSecret: '8SPB0S72QdlEudElp-yzgFSiKIs',
    username: 'boogermanus',
    password: 'Naruto35'
});

var usersToFollow = ["boogermanus"];
var previousItems = []
var emitter = new EventEmitter();

var getDisplay = function(data) {
    return data.subreddit_name_prefixed + " -> " + data.title;
}

var reportRecents = function(data) {
    if(previousItems.length == 0) {
        for(upvoted of data) {
            var display  = getDisplay(upvoted);
            previousItems.push(display);
            emitter.emit('add', display);
        }
    }
    else {
        for(upvoted of data) {

            var display = getDisplay(upvoted);

            if(previousItems.findIndex(s => s === display) === -1)
            {
                //remove last item in list and add this item to top of stack
                previousItems.splice(-1,1);
                previousItems.splice(0,0,display);

                emitter.emit('add', display);
            }
        }
    }
}

var followUserUpvotes = function() {
    for(user of usersToFollow) {
        r.getUser(user).getUpvotedContent({'limit': 10 })
        .then(reportRecents)
    }
}

setInterval(followUserUpvotes, 15000);
emitter.on('add',console.log);

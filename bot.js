const EventEmitter = require('events');

class RedditBot extends EventEmitter {
    constructor(snoo) {
        super();
        this.snoo = snoo;
        this.count = 1;
    }

    run() {
        setInterval(() => {
            this.emit('data',{count:this.count++})
        }, 1000);
    }
}

module.exports = {
    RedditBot:RedditBot
}
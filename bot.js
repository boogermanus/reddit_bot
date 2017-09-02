const EventEmitter = require('events');
const utilities = require('./utilities');

class RedditBot extends EventEmitter {
    constructor(snoo) {
        super();
        this.snoo = snoo;
        this.recentSubmissions = [];
    }

    run() {
        setInterval(() => {this.refresh()}, 10000);
    }
    
    async getSubreddit(subredditName) {
        let subreddit = this.snoo.getSubreddit(subredditName);
        let data = await subreddit.getNew({limit: 10});
        return data;
    }

    async refresh() {
        let data = await this.getSubreddit('pics');

        //if not data, push everything
        if(this.recentSubmissions.length === 0) {
            for(let submission of data) {
                console.log(submission.toJSON());
                this.recentSubmissions.push(utilities.getSubmissionJSON(submission));
            }

            this.emit('data', this.recentSubmissions);
        }
        else {
            //we have data, so we need to process the incoming data to determine
            //if it is new.
            let newData = [];
            for(let submission of data) {
                if(this.recentSubmissions.findIndex(i => i.title === submission.title) === -1) {
                    let newSub = utilities.getSubmissionJSON(submission);
                    //remove first record
                    this.recentSubmissions.pop();
                    this.recentSubmissions.unshift(newSub);
                    newData.push(newSub);
                }
            }

            this.emit('data', newData);
        }
    }
}

module.exports = {
    RedditBot:RedditBot
}
const EventEmitter = require('events');
const utilities = require('./utilities');
const fs = require('fs');

class RedditBot extends EventEmitter {
    constructor(snoo) {
        super();
        this.snoo = snoo;
        this.recentSubmissions = [];
        this.watchList = [];
        this.finds = [];
    }

    run() {
        setInterval(() => {this.refresh()}, 10000);
    }

    emitData(data) {
        this.emit('data', data);
    }

    loadData(data) {
        for(let submission of data) {
            //console.log(submission.toJSON());
            this.recentSubmissions.push(utilities.getSubmissionJSON(submission));
        }
    }

    addData(data) {
        let newData = [];
        for(let submission of data) {
            //only add items that are not in the list
            if(this.recentSubmissions.findIndex(i => i.title === submission.title) === -1) {
                let newSub = utilities.getSubmissionJSON(submission);
                //remove first record
                this.recentSubmissions.pop();
                this.recentSubmissions.unshift(newSub);
                newData.push(newSub);
            }
        }
        return newData;
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
            this.loadData(data);
            this.emitData(this.recentSubmissions);
        }
        else {
            //we have data, so we need to process the incoming data to determine
            //if it is new.}
            let newData = this.addData(data)
            this.emit('data', newData);
        }
    }
}

module.exports = {
    RedditBot:RedditBot
}
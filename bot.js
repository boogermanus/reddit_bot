const EventEmitter = require('events');
const utilities = require('./utilities');
const fs = require('fs');

class RedditBot extends EventEmitter {
    constructor(snoo) {
        super();
        this.snoo = snoo;
        this.recentSubmissions = [];
        this.watchList = [];
    }

    run() {
        this.watchList = this.loadWatchList('watchlist.txt');

        setInterval(() => {this.refresh()}, 10000);
    }

    loadWatchList(fileName) {
        return fs.readFileSync(fileName).toString().split('\n');
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

    watchData(data) {
        for(let watch of this.watchList) {
            let filtered = data.filter(d => d.title.toLowerCase().indexOf(watch) !== -1);
            if(filtered.length > 0) {
                for(let item of filtered) {
                    console.log("Found: " + watch + " in " + item.id);
                }
            }
        }
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
            this.watchData(data);
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
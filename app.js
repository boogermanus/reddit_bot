const snoowrap = require('snoowrap');
const key = require('./redditkey');
const bot = require('./bot');
const utilities = require('./utilities');
const watcher = require('./watcher');

let r = new snoowrap(key.RedditAPIKey);
let redditBot = new bot.RedditBot(r);
redditBot.run();

let theWatch = new watcher.Watcher();

redditBot.on('data',(data) => {
    console.log("\x1b[32m"+"Data Update -> " + new Date().toLocaleString('en-US'));

    for(let sub of data) {
        console.log(utilities.logSubmissionJSON(sub));
    }

    theWatch.watchData(data);
});

theWatch.on('find', (matches) => {
    console.log("\x1b[33m" + "Watcher Update -> " + new Date().toLocaleString('en-US'));

    for(let sub of matches.found) {
        console.log(utilities.logWatchJSON(matches.word, sub));
    }
})

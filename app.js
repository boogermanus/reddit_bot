const snoowrap = require('snoowrap');
const key = require('./redditkey');
const bot = require('./bot');
const utilities = require('./utilities');

let r = new snoowrap(key.RedditAPIKey);
let redditBot = new bot.RedditBot(r);
redditBot.run();

redditBot.on('data',(data) => {
    console.log("Data Update -> " + new Date().toLocaleString('en-US'));

    for(let sub of data) {
        console.log(utilities.logSubmissionJSON(sub));
    }
    
});


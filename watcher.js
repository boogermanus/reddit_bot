const EventEmitter = require('events');
const utilities = require('./utilities');

class Watcher extends EventEmitter {
    constructor() {
        super();
        this.watchList = utilities.loadFile("watchlist.txt");
    }

    watchData(data) {
        
        for(let watch of this.watchList) {
            let filtered = data.filter(d => d.title.toLowerCase().indexOf(watch) !== -1);
            if(filtered.length > 0) {
                let finds = [];
                for(let item of filtered) {
                    finds.push(item);
                }
                this.emit('find', {word:watch,found:finds});
            }
        }
    }
}

module.exports = {
    Watcher:Watcher
}
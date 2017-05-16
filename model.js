var User = function(user) {
    this.user = user;
    this.previousUpvotes = [];
}

User.prototype.addUpvotes = function(data) {
    for(datum of data) { 
        this.previousUpvotes.push(datum);
    }
}

User.prototype.addUpvote = function(data) {
    //is it in the list?
    if(this.previousUpvotes.findIndex(s => s.name === data.name) === -1)
    {
        //remove last item in list and add this item to top of stack
        this.previousUpvotes.splice(-1,1);
        this.previousUpvotes.splice(0,0,data);
        return true;
    }

    return false;
}

module.exports = {
    User: User
};


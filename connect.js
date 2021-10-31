const mongoose = require("mongoose");
var mongoDB = 'mongodb+srv://skylarli:Intern2021@cluster0.vgzox.mongodb.net/met?retryWrites=true&w=majority';

class Database {
    constructor(){
        this._connect();
    }
    _connect(){
        mongoose.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                console.log('Connected!');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = new Database();
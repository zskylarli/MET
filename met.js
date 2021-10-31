const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;

const tripSchema = new Schema(
    {
        key:{
            type: String,
            required: true,
        },
        artworks: {
            type: Array,
            required: false,
        }, 
    }
);

module.exports = mongoose.model('MetTrip',tripSchema);
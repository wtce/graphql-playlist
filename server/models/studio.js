const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studioSchema = new Schema({
    name: String,
    year: Number,
});

module.exports = mongoose.model('Studio', studioSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    name: String,
    genre: String,
    studioId: String
});

module.exports = mongoose.model('Anime', animeSchema);
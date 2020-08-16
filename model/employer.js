const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @description fornecer o esquema para employer
 */
const employer = new Schema({
    employer_name: { type: String, required: true },
    employer_code: { type: String, required: true },
    member_count: { type: Number, required: true, unique: true },
    thumbnail: { type: String },
    register_date: { type: String }
});

module.exports = mongoose.model( 'employer', employer);

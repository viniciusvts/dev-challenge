const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @description fornecer o esquema para employer
 */
const medicallicense = new Schema({
    initial_date: { type: String, required: true },
    final_date: { type: String, required: true },
    time: { type: Number, required: true },
    member_code: { type: Number, required: true }
});

module.exports = mongoose.model( 'medicallicense', medicallicense);

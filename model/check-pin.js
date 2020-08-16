const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @description fornecer o esquema para employerCheckPin
 */
const employerCheckPin = new Schema({
    member_name: { type: String, required: true },
    member_code: { type: Number, required: true },
    member_personal_data: {
        father: { type: String, required: true },
        mother: { type: String, required: true },
        hand: { type: Boolean, required: true },
    },
    thumbnailHd: { type: String },
    birthday: { type: String }
});

module.exports = mongoose.model( 'employerCheckPin', employerCheckPin);

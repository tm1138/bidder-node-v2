var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator')

const customerSchema = new Schema({
	username: {type: String, unique: true, required: true},
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	password: {type: String, required: true},
	email_id: {type: String, required: true, unique: true},
	mob_number: {type: String, required: true, unique: true}
});

customerSchema.plugin(uniqueValidator);

module.exports.customerSchema = mongoose.model('customers', customerSchema);
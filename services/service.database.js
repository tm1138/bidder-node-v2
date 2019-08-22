var mongoose = require('mongoose');

var mongooesSchemas = require('../mongoose/mongoose.schema');

var customerModel = mongooesSchemas.customerSchema;

class DatabaseService
{
    constructor(config)
    {
        console.log(config);
		this.connectionString = 'mongodb://' + config.username + ':' + config.password +'@' + config.host + ':' + config.port + '/' + config.database + '?authSource=' + config.authsource;
		console.log('dataservice object created');
	}
	
    Init()
    {
        return mongoose.connect(this.connectionString, {
			useNewUrlParser: true
		});
    }

    CreateCustomer(data)
	{
		//console.log(data);
		
		var customer = new customerModel({
			username: data.username,
			first_name: data.first_name,
			last_name: data.last_name,
			password: data.password,
			email_id: data.email_id,
			mob_number: data.mob_number
		});

		return customer.save();
	}

	GetCustomerDetails(username)
	{
		return customerModel.find({username: username});
	}

	ValidateUserCredentials (login_username, login_password)
	{
		return customerModel.find({username: login_username, password: login_password});
	}
}

module.exports = DatabaseService;


const CustomerModel = require('../models/model.customer');

const validateCustomer = require('./../fastest_validator_schemas/customer.schema');

class CustomerService
{
    constructor(databaseService, formattingHelper)
    {
        this.databaseService = databaseService;
        this.formattingHelper = formattingHelper;
    }

    RegisterCustomer(data)
    {
        var validationResponse = validateCustomer(data);

        if(validationResponse != true)
        {
            return Promise.reject(this.formattingHelper.FormatFastestValidatorError(validationResponse));
		}
        else
        {
            return this.databaseService.CreateCustomer(data).then(savedCustomer => {
                return savedCustomer;
            })
            .catch (err => {
                return Promise.reject(this.formattingHelper.FormatMongooseError(err));
            });
        }
    }

    ValidateLogin (username, password)
    {
        return this.databaseService.ValidateUserCredentials(username, password).then(customerDetails => {
            if (customerDetails.length == 1)
            {
                return customerDetails[0].username;
            }
            else
            {
                return null;
            }
        })
        .catch (err => {
            return Promise.reject(this.formattingHelper.FormatMongooseError(err));
        })
    }

    GetUserDetails (username)
    {
        return this.databaseService.GetCustomerDetails(username).then(customerDetails => {
            return customerDetails;
        })
        .catch (err => {
            return Promise.reject(this.formattingHelper.FormatMongooseError(err));
        })
    }
}

module.exports = CustomerService;
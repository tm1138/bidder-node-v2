module.exports = class ErrorFormatter {
    FormatMongooseError(mongoose_error) {
        let err = mongoose_error.errors;
        let errors = {}
        for (var key in err) {
            if (err.hasOwnProperty(key)) {
                if (err[key].kind == 'unique') {
                    errors[key] = 'should be unique, current vaule already exists'
                }
                else {
                    errors[key] = 'invalid value'
                }
            }
        }
        return errors;
    }


    FormatFastestValidatorError(validator_error) {
        let errors = {};
        for (const index in validator_error) {
            errors[validator_error[index].field] = validator_error[index].message;
        }
        return errors;
    }
}
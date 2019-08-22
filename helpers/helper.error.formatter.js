module.exports = class ErrorFormatter
{
    FormatMongooseError(mongoose_error)
    {
        var err = mongoose_error.errors;
        var errors = {}
        for (var key in err)
        {
            if (err.hasOwnProperty(key))
            {
                let val = err[key];
                errors[key] = {
                    'type' : val.kind,
                    'current_val' : val.value
                };
            }
        }
        return errors;
    }


    FormatFastestValidatorError(validator_error)
    {
        let errors = [], item;
        for (const index in validator_error)
        {
            item = validator_error[index];
            errors.push({
                field: item.field,
                message: item.message
            });
        }
        return errors;
    }
}
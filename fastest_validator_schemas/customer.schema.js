var validator = require('fastest-validator');
let v = new validator();

let namePattern = /([A-Za-z\-\’])*/;
let mobileNumberPattern = /[0-9]{10}/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

const customerVSchema = {
                        username: {type: "string", min: 3},

                        first_name: {type: "string", min: 4, max: 50, pattern: namePattern},
                        last_name: {type: "string", min: 4, max: 50, pattern: namePattern},
                        email_id: {type: "email", max: 75},
                        mob_number: {type: "string", pattern: mobileNumberPattern},

                        password: {type: "string", min: 6, max: 50, pattern: passwordPattern}
};

module.exports = v.compile(customerVSchema);
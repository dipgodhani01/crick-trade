const yup = require('yup');

exports.signInSchema = yup.object({
    username:yup.string().required(),
    email:yup.string().email().required(),
    password:yup.string().required(),
})
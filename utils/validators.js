const { body } = require('express-validator');
const User = require('../models/User');

exports.registerValidators = [
    body('email')
        .isEmail()
        .withMessage('Մուտքագրեք ճիշտ Էլեկտրոնային փոստի հասցե')
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ email: value })
                if (user) {
                    return Promise.reject('Այդպիսի օգտատեր արդեն գոյություն ունի')
                }

            } catch (e) {
                console.log(e)
            }
        })
        .normalizeEmail(),
    body('password', 'Գաղտնաբառը պետք է լինի 6 նիշից ոչ պակաս')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Գաղտնաբառերը չեն համընկնում')
            }
            return true
        })
        .trim(),
]


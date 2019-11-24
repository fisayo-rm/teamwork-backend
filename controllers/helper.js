const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Helper = {
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },

    comparePassword(hashPassword, password) {
        return bcrypt.comparePassword(password, hashPassword);
    },

    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
}

module.exports = Helper;
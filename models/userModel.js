const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "User" }

});

userSchema.pre('save', async function (next) {

    // if (!this.isModified('password')) return next();

    try {

        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();

    } catch (err) {
        next(err);
    }

});

userSchema.pre('findOneAndUpdate', async function (next) {
    const userToUpdate = await this.model.findOne(this.getQuery())

    if (userToUpdate.password !== this._update.password) {
        const salt = await bcrypt.genSalt();
        this._update.password = await bcrypt.hash(this._update.password, salt)
    }
    next();
})

userSchema.methods.validatePassword = async (password) => {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('users', userSchema);
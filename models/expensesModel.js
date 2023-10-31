const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    amount: { type: Number, required: true },
    email: { type: String, required: true },
    note: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
});

module.exports = mongoose.model('expenses', newsSchema);

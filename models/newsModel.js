const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    newsLink: { type: String },
    imageUrl: { type: String, default: "still no image_url" }
});

module.exports = mongoose.model('news', newsSchema);

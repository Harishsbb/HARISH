const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: String,
    tech: [String],
    repoUrl: String,
    demoUrl: String,
    images: [String],
    image: String,
    featured: { type: Boolean, default: false },
    date: Date
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);

const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    linkedin: String,
    github: String,
    image: String,
    summary: { type: String, required: true },
    skills: [String],
    education: [{
        institution: String,
        degree: String,
        year: String,
        description: String
    }],
    experience: [{
        company: String,
        role: String,
        duration: String,
        description: String
    }],
    certifications: [{
        name: String,
        issuer: String,
        date: String,
        url: String
    }],
    achievements: [String],
    social: [{
        platform: String,
        url: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);

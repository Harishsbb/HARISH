require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Profile = require('../models/Profile');

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const projects = await Project.find({});
        console.log(`Total Projects: ${projects.length}`);
        projects.forEach(p => console.log(`- ${p.title} (Featured: ${p.featured}, Tech: ${p.tech})`));

        const profile = await Profile.findOne({});
        if (profile) {
            console.log(`Profile Skills: ${profile.skills.join(', ')}`);
        } else {
            console.log('Profile not found');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkData();

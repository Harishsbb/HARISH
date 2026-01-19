require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Profile = require('../models/Profile');

const addThreeJsSkill = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Adding Skill');

        // Find the profile and update skills
        const profile = await Profile.findOne();
        if (profile) {
            if (!profile.skills.includes('Three Js') && !profile.skills.includes('Three.js')) {
                profile.skills.push('Three Js');
                await profile.save();
                console.log('Added "Three Js" to skills.');
            } else {
                console.log('"Three Js" already exists in skills.');
            }
        } else {
            console.log('Profile not found.');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

addThreeJsSkill();

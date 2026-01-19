require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Profile = require('../models/Profile');

const updateProfileImage = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Updating Profile Image');

        const result = await Profile.findOneAndUpdate(
            {}, // Update the first (and likely only) profile found
            { $set: { image: '/harish-professional.png' } },
            { new: true }
        );

        if (result) {
            console.log(`Updated Profile Image for: ${result.name}`);
            console.log(`New Image Path: ${result.image}`);
        } else {
            console.log('Profile not found.');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateProfileImage();

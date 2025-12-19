require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Profile = require('../models/Profile');

const updateProfileEmail = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Updating Profile Email');

        // Find the Profile (assuming single profile) and update email
        // Using findOneAndUpdate without condition since there is usually only one profile
        const result = await Profile.findOneAndUpdate(
            {},
            { $set: { email: 'bavaharishkumar@gmail.com' } },
            { new: true, upsert: true } // Create if doesn't exist (though it should)
        );

        if (result) {
            console.log(`Updated Profile Name: ${result.name}`);
            console.log(`Updated Profile Email: ${result.email}`);
        } else {
            console.log('Profile not found.');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateProfileEmail();

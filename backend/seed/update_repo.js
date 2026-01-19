require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('../models/Project');

const updateProjectRepo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Updating Repo URL');

        // Find the Clinic Booking System project and update its repoUrl
        const result = await Project.findOneAndUpdate(
            { title: 'Clinic Booking System' },
            { $set: { repoUrl: 'https://github.com/Harishsbb/clinic_booking' } },
            { new: true }
        );

        if (result) {
            console.log(`Updated Project: ${result.title}`);
            console.log(`New Repo URL: ${result.repoUrl}`);
        } else {
            console.log('Project "Clinic Booking System" not found.');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateProjectRepo();

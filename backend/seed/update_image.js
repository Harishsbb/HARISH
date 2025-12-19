require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('../models/Project');

const updateProjectImage = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Updating Image');

        // Find the Clinic Booking System project and update its image
        const result = await Project.findOneAndUpdate(
            { title: 'Clinic Booking System' },
            { $set: { image: '/medicare_project_card.png' } },
            { new: true }
        );

        if (result) {
            console.log(`Updated Project: ${result.title}`);
            console.log(`New Image Path: ${result.image}`);
        } else {
            console.log('Project "Clinic Booking System" not found.');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateProjectImage();

require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Profile = require('../models/Profile');

const fixData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Fix Project
        const project = await Project.findOneAndUpdate(
            { title: 'Clinic Booking System' },
            {
                $set: {
                    featured: true,
                    image: '/medicare_project_card.png',
                    repoUrl: 'https://github.com/Harishsbb/clinic_booking',
                    demoUrl: 'https://clinic-booking-rho.vercel.app/'
                }
            },
            { new: true }
        );
        console.log('Project updated:', project ? project.title : 'Not found');

        // Fix Profile Skills
        const profile = await Profile.findOne();
        if (profile) {
            // Remove duplicates just in case
            let skills = [...new Set(profile.skills)];
            if (!skills.includes('Three Js')) {
                skills.push('Three Js');
            }
            profile.skills = skills;
            await profile.save();
            console.log('Profile skills updated:', profile.skills);
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixData();

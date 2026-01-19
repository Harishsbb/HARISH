require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('../models/Project');

const updateProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Note: Sort is { date: -1 } (Descending), so most recent date shows first.

        // 1. Clinic Booking System (Should be 1st)
        await Project.findOneAndUpdate(
            { title: { $regex: 'Clinic', $options: 'i' } },
            {
                date: new Date('2026-01-19T10:00:00Z'),
                image: '/medicare_project_card.png'
            }
        );
        console.log('Updated Clinic Booking System');

        // 2. Self Shopping Smart Trolley (Should be 2nd)
        await Project.findOneAndUpdate(
            { title: { $regex: 'Smart Trolley', $options: 'i' } },
            {
                date: new Date('2026-01-19T09:00:00Z'),
                demoUrl: 'https://trolley-frontend-lemon.vercel.app/',
                repoUrl: 'https://github.com/Harishsbb/trolley'
            }
        );
        console.log('Updated Smart Trolley');

        // 3. Solo Leveling Todo (Should be 3rd)
        await Project.findOneAndUpdate(
            { title: { $regex: 'Solo Leveling', $options: 'i' } },
            {
                date: new Date('2026-01-19T08:00:00Z')
            }
        );
        console.log('Updated Solo Leveling');

        // 4. Bank Management System (Should be 4th)
        await Project.findOneAndUpdate(
            { title: { $regex: 'Bank', $options: 'i' } },
            {
                date: new Date('2026-01-18T10:00:00Z')
            }
        );
        console.log('Updated Bank Management System');

        console.log('All Projects Updated');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateProjects();

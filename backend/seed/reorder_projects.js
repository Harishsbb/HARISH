require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('../models/Project');

const updateProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Note: Sort is { date: -1 } (Descending), so most recent date shows first.

        // 1. Clinic Booking System (Should be 1st)
        // Set to a future date or just today + 1 hour
        const date1 = new Date();
        date1.setHours(date1.getHours() + 10);

        await Project.findOneAndUpdate(
            { title: { $regex: 'Clinic', $options: 'i' } },
            {
                date: date1
            }
        );
        console.log('Updated Clinic Booking System');

        // 2. Self Shopping Smart Trolley (Should be 2nd)
        // Set to today + 5 hours
        const date2 = new Date();
        date2.setFullYear(2030);

        await Project.findOneAndUpdate(
            { title: { $regex: 'Smart Trolley', $options: 'i' } },
            {
                date: date2,
                demoUrl: 'https://trolley-frontend-lemon.vercel.app/',
                repoUrl: 'https://github.com/Harishsbb/trolley'
            }
        );
        console.log('Updated Smart Trolley');

        // 3. Solo Leveling Todo (Should be 3rd)
        // Set to today
        const date3 = new Date();

        await Project.findOneAndUpdate(
            { title: { $regex: 'Solo Leveling', $options: 'i' } },
            {
                date: date3
            }
        );
        console.log('Updated Solo Leveling');

        // 4. Bank Management System (Should be 4th)
        // Set to yesterday
        const date4 = new Date();
        date4.setDate(date4.getDate() - 1);

        await Project.findOneAndUpdate(
            { title: { $regex: 'Bank', $options: 'i' } },
            {
                date: date4
            }
        );
        console.log('Updated Bank Management System');

        // Ensure Clinic is actually first. 
        // Logic check:
        // Clinic: Today + 10h
        // Trolley: Today + 5h
        // Solo: Today
        // Bank: Yesterday
        // Sort {date: -1}: Clinic, Trolley, Solo, Bank. Correct.

        console.log('All Projects Updated');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateProjects();

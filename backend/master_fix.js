require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('./models/Project');

const masterFix = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // 1. Clinic Booking System
        await Project.findOneAndUpdate(
            { title: { $regex: 'Clinic', $options: 'i' } },
            {
                title: 'Clinic Booking System',
                date: new Date('2026-01-19T10:00:00Z'),
                featured: true,
                image: '/medicare_project_card.png',
                demoUrl: 'https://clinic-booking-rho.vercel.app/',
                repoUrl: 'https://github.com/Harishsbb/clinic_booking'
            },
            { upsert: true }
        );
        console.log('Fixed Clinic');

        // 2. Self Shopping Smart Trolley
        await Project.findOneAndUpdate(
            { title: { $regex: 'Smart Trolley', $options: 'i' } },
            {
                title: 'Self Shopping Smart Trolley (SIH 2024)',
                date: new Date('2026-01-19T09:00:00Z'),
                featured: true,
                image: '/project-trolley.png',
                demoUrl: 'https://trolley-frontend-lemon.vercel.app/',
                repoUrl: 'https://github.com/Harishsbb/trolley'
            },
            { upsert: true }
        );
        console.log('Fixed Trolley');

        // 3. Solo Leveling Todo
        await Project.findOneAndUpdate(
            { title: { $regex: 'Solo Leveling', $options: 'i' } },
            {
                title: 'Solo Leveling Todo',
                date: new Date('2026-01-19T08:00:00Z'),
                featured: true,
                image: '/solo-leveling-todo.png',
                demoUrl: 'https://solo-leveling-todo1.vercel.app',
                repoUrl: 'https://github.com/Harishsbb/solo-leveling-todo1'
            },
            { upsert: true }
        );
        console.log('Fixed Solo');

        // 4. Bank Management System
        await Project.findOneAndUpdate(
            { title: { $regex: 'Bank', $options: 'i' } },
            {
                title: 'Bank Management System',
                date: new Date('2026-01-18T10:00:00Z'),
                featured: true,
                image: '/project-bank.png',
                repoUrl: 'https://github.com/Harishsbb/bank-management'
            },
            { upsert: true }
        );
        console.log('Fixed Bank');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

masterFix();

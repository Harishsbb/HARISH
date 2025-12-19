require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('../models/Project');

const addProject = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Adding Project');

        const newProject = {
            title: 'Clinic Booking System',
            shortDescription: 'Full-stack healthcare platform for appointment scheduling, doctor management, and hospital listings with 3D UI elements.',
            longDescription: 'Full-stack healthcare platform for appointment scheduling, doctor management, and hospital listings with 3D UI elements. Features include finding doctors, booking appointments, and managing hospital directories. Built with a modern, responsive design using 3D elements for an immersive user experience.',
            tech: ['React Js', 'Express Js', 'MongoDB', 'Tailwind CSS', 'Three Js'],
            repoUrl: 'https://github.com/Harishsbb/clinic-booking-system',
            demoUrl: 'https://clinic-booking-rho.vercel.app/',
            image: '/clinic-booking.png',
            featured: true,
            date: new Date()
        };

        await Project.create(newProject);
        console.log('Project Added Successfully');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

addProject();

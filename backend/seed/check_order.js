require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('../models/Project');

const checkOrder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const projects = await Project.find({}).sort({ date: -1 });

        console.log('--- Current Project Order in DB ---');
        projects.forEach((p, index) => {
            console.log(`${index + 1}. ${p.title} - Date: ${p.date}`);
        });

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkOrder();

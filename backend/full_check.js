require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('./models/Project');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const projects = await Project.find({ featured: true }).sort({ date: -1 });

    console.log('--- PROJECT DATA ---');
    projects.forEach(p => {
        console.log(`Title: ${p.title}`);
        console.log(`Date: ${p.date}`);
        console.log(`Image: ${p.image}`);
        console.log(`Demo: ${p.demoUrl}`);
        console.log('---');
    });
    process.exit();
}

check();

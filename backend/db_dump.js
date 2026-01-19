require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('./models/Project');

async function debug() {
    await mongoose.connect(process.env.MONGO_URI);
    const projects = await Project.find({ featured: true });
    console.log('--- ALL FEATURED PROJECTS ---');
    projects.forEach(p => {
        console.log(`ID: ${p._id}`);
        console.log(`Title: ${p.title}`);
        console.log(`Date: ${p.date}`);
        console.log(`Featured: ${p.featured}`);
        console.log('---');
    });
    process.exit();
}

debug();

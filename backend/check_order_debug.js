require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('./models/Project');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const projects = await Project.find({ featured: true }).sort({ date: -1 });
    console.log('--- PROJECT LIST ---');
    projects.forEach((p, i) => {
        console.log(`${i + 1}. ${p.title} (${p.date.toISOString()})`);
    });
    console.log('--------------------');
    process.exit();
}

check();

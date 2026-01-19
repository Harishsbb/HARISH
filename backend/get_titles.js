require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('./models/Project');
const fs = require('fs');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const projects = await Project.find({});
    let out = projects.map(p => `"${p.title}"`).join('\n');
    fs.writeFileSync('titles.txt', out);
    process.exit();
}

check();

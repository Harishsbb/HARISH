require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('./models/Project');
const fs = require('fs');

async function debug() {
    await mongoose.connect(process.env.MONGO_URI);
    const projects = await Project.find({ featured: true }).sort({ date: -1 });
    let report = '--- PROJECT ORDER REPORT ---\n';
    projects.forEach((p, i) => {
        report += `${i + 1}. ${p.title}\n`;
        report += `   Date: ${p.date.toISOString()}\n`;
        report += `   Demo: ${p.demoUrl}\n`;
        report += `   ID: ${p._id}\n`;
        report += '----------------------------\n';
    });
    fs.writeFileSync('db_report.txt', report);
    console.log('Report generated in db_report.txt');
    process.exit();
}

debug();

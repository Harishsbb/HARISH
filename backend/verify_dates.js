require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Project = require('./models/Project');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const trolley = await Project.findOne({ title: { $regex: 'Smart Trolley', $options: 'i' } });
    const clinic = await Project.findOne({ title: { $regex: 'Clinic', $options: 'i' } });
    const solo = await Project.findOne({ title: { $regex: 'Solo', $options: 'i' } });
    const bank = await Project.findOne({ title: { $regex: 'Bank', $options: 'i' } });

    console.log('--- DB DATES ---');
    if (clinic) console.log(`Clinic: ${clinic.date}`);
    if (trolley) console.log(`Trolley: ${trolley.date}`);
    if (solo) console.log(`Solo: ${solo.date}`);
    if (bank) console.log(`Bank: ${bank.date}`);
    console.log('----------------');
    process.exit();
}

check();

require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

async function checkProjects() {
    // Connect to 'portfolio' database explicitly
    const uri = process.env.MONGO_URI.replace('?', 'portfolio?');
    console.log('Connecting to:', uri);
    await mongoose.connect(uri);

    // We can't use the model directly because it's bound to the previous connection if we aren't careful, 
    // but a new mongoose instance or just using the connection is fine.
    const projects = await mongoose.connection.db.collection('projects').find({ featured: true }).toArray();

    console.log('--- PROJECTS IN portfolio DB ---');
    projects.forEach(p => {
        console.log(`Title: ${p.title} | Date: ${p.date}`);
    });
    process.exit();
}

checkProjects();

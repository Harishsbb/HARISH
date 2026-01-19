require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const ProjectSchema = require('./models/Project').schema;

const dbs = ['test', 'portfolio'];

async function fixAll() {
    for (const db of dbs) {
        console.log(`Connecting to ${db}...`);
        // Clean URI to avoid double DB names
        let baseUri = process.env.MONGO_URI.split('.net/')[0] + '.net/';
        let params = process.env.MONGO_URI.split('?')[1] || 'appName=Cluster0';
        const uri = `${baseUri}${db}?${params}`;

        try {
            const conn = await mongoose.createConnection(uri).asPromise();
            const Coll = conn.model('Project', ProjectSchema);

            // 1. Clinic
            await Coll.findOneAndUpdate(
                { title: { $regex: 'Clinic', $options: 'i' } },
                {
                    date: new Date('2026-01-19T10:00:00Z'),
                    image: '/medicare_project_card.png',
                    featured: true,
                    demoUrl: 'https://clinic-booking-rho.vercel.app/'
                }
            );

            // 2. Solo Leveling (Second)
            await Coll.findOneAndUpdate(
                { title: { $regex: 'Solo Leveling', $options: 'i' } },
                {
                    date: new Date('2026-01-19T09:00:00Z'),
                    featured: true
                }
            );

            // 3. Smart Trolley (Third)
            await Coll.findOneAndUpdate(
                { title: { $regex: 'Smart Trolley', $options: 'i' } },
                {
                    date: new Date('2026-01-19T08:00:00Z'),
                    demoUrl: 'https://trolley-frontend-lemon.vercel.app/',
                    repoUrl: 'https://github.com/Harishsbb/trolley',
                    featured: true
                }
            );

            // 4. Bank (Fourth)
            await Coll.findOneAndUpdate(
                { title: { $regex: 'Bank', $options: 'i' } },
                {
                    date: new Date('2026-01-18T10:00:00Z'),
                    featured: true
                }
            );

            console.log(`Successfully updated ${db}`);
            await conn.close();
        } catch (err) {
            console.error(`Error with ${db}:`, err.message);
        }
    }
    process.exit();
}

fixAll();

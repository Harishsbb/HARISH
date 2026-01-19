require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: String,
    date: Date,
    demoUrl: String,
    repoUrl: String,
    featured: Boolean,
    image: String
});

const dbs = ['test', 'portfolio'];

async function fixAll() {
    for (const db of dbs) {
        console.log(`\n--- Processing DB: ${db} ---`);
        let baseUri = process.env.MONGO_URI.split('.net/')[0] + '.net/';
        let params = process.env.MONGO_URI.split('?')[1] || 'appName=Cluster0';
        const uri = `${baseUri}${db}?${params}`;

        try {
            const conn = await mongoose.createConnection(uri).asPromise();
            const Coll = conn.model('Project', ProjectSchema);

            const projects = await Coll.find({}).toArray ? await Coll.find({}).toArray() : await Coll.find({});
            console.log(`Found ${projects.length} projects in ${db}`);

            const updates = [
                { reg: /Clinic/i, data: { title: 'Clinic Booking System', date: new Date('2026-01-19T10:00:00Z'), image: '/medicare_project_card.png', featured: true, demoUrl: 'https://clinic-booking-rho.vercel.app/' } },
                { reg: /Solo Leveling/i, data: { date: new Date('2026-01-19T09:00:00Z'), featured: true } },
                { reg: /Smart Trolley/i, data: { date: new Date('2026-01-19T08:00:00Z'), demoUrl: 'https://trolley-frontend-lemon.vercel.app/', repoUrl: 'https://github.com/Harishsbb/trolley', featured: true } },
                { reg: /Bank/i, data: { date: new Date('2026-01-18T10:00:00Z'), featured: true } }
            ];

            for (const update of updates) {
                const res = await Coll.findOneAndUpdate(
                    { title: { $regex: update.reg.source, $options: 'i' } },
                    { $set: update.data },
                    { new: true }
                );
                if (res) {
                    console.log(`  [OK] Updated: ${res.title} -> ${res.date.toISOString()}`);
                } else {
                    console.log(`  [SKIP] Not found: ${update.reg}`);
                }
            }

            await conn.close();
            console.log(`Finished ${db}`);
        } catch (err) {
            console.error(`  [ERROR] ${db}:`, err);
        }
    }
    process.exit();
}

fixAll();

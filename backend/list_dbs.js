require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

async function checkDBs() {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    const admin = new mongoose.mongo.Admin(conn.connection.db);
    const dbs = await admin.listDatabases();
    console.log('Databases:', dbs.databases.map(d => d.name));
    process.exit();
}

checkDBs();

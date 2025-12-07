require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const AdminUser = require('../models/AdminUser');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        // Clear existing data
        await Profile.deleteMany({});
        await Project.deleteMany({});
        await AdminUser.deleteMany({});

        // Seed Admin User
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD_HASH || 'admin123', salt);

        await AdminUser.create({
            email: process.env.ADMIN_EMAIL || 'admin@example.com',
            passwordHash,
            role: 'admin'
        });
        console.log('Admin User Seeded');

        // Seed Profile
        await Profile.create({
            name: 'Harish K',
            title: 'Full Stack Developer and Data Analyst',
            email: 'bavaharishkumar@gmail.com',
            phone: '6369151728',
            linkedin: 'https://linkedin.com/in/harishk06944/',
            github: 'https://github.com/Harishsbb',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQFjksFLvqGUGg/profile-displayphoto-crop_800_800/B56ZmvfSdNIYAI-/0/1759585839487?e=1766620800&v=beta&t=5xOpY2HCvARDK4Omiv6042LXlYKAKk2LwK_OecXJjVk',
            summary: 'Computer Science undergraduate specializing in Data Science and Full Stack Development. Skilled in Python, Java, SQL, Flask, and MERN stack, with strong knowledge of data structures and algorithms DSA, solving 250+ coding problems on platforms like LeetCode. Experienced in developing machine learning models (achieved up to 82% accuracy) and web applications through projects, certifications, and internships. Passionate about applying AI, ML, and web technologies to deliver scalable and impactful solutions.',
            skills: ['Python', 'Java', 'JavaScript', 'Express JS', 'Flask', 'Node JS', 'React JS', 'Pandas', 'NumPy', 'Scikit-Learn', 'MySQL', 'Mongo DB', 'Git', 'Postman', 'VS Code', 'Figma'],
            education: [
                {
                    institution: 'PSNACET',
                    degree: 'BE Computer Science Engineering',
                    year: '2023 - 2027',
                    description: 'CGPA 8.01/10. Dindigul, India'
                },
                {
                    institution: 'MSP SOLAI NADAR BOYS HR SEC SCHOOL',
                    degree: 'HSC',
                    year: '2022 - 2023',
                    description: '73%. Dindigul, India'
                }
            ],
            experience: [
                {
                    company: '1Stop',
                    role: 'Java Intern',
                    duration: 'May 2025 - June 2025',
                    description: 'Completed a 2-month internship in Java programming, focusing on OOP, data structures, and backend development. Built and tested 3+ Java applications using Java, JDBC, and SQL, improving debugging efficiency and performance that decreased regression time from 5 days to 2 days.'
                }
            ],
            certifications: [
                { name: 'Introduction to Machine Learning', issuer: 'NPTEL (IIT Madras)', date: '2023', url: '#' },
                { name: 'MongoDB – Proof of Completion', issuer: 'MongoDB', date: '2023', url: '#' },
                { name: 'JavaScript Language', issuer: 'LinkedIn Learning', date: '2023', url: '#' },
                { name: 'Front-End Development with HTML & CSS', issuer: 'Great Learning', date: '2023', url: '#' },
                { name: 'Generative AI for Beginners', issuer: 'Great Learning', date: '2024', url: '#' }
            ],
            achievements: [
                'Hackovation 2.0 – VIT Chennai (Sep 2025): Secured 3rd Prize in a 32-hour national-level hackathon.',
                'First Prize — Paper Presentation (RAGEX’25, ROBO Club, ECE Dept.) — Nov 1, 2025.',
                'SIH 2024 Project Led Smart India Hackathon project, reducing checkout time by 40%.',
                'Solved 250+ coding problems, enhancing data structures and algorithms skills.'
            ],
            social: [
                { platform: 'LinkedIn', url: 'https://linkedin.com/in/harishk06944/' },
                { platform: 'GitHub', url: 'https://github.com/Harishsbb' }
            ]
        });
        console.log('Profile Seeded');

        // Seed Projects
        const projects = [
            {
                title: 'Self Shopping Smart Trolley (SIH 2024)',
                shortDescription: 'Smart trolley with automated billing.',
                longDescription: 'Developed a smart shopping trolley prototype automating billing and inventory tracking, reducing checkout time by 40%. Achieved 80% feature completion collaboratively in a team of 6 members. Integrated automated billing system to enhance user convenience and minimize manual errors. Demonstrated prototype in a live environment, highlighting efficiency and usability improvements.',
                tech: ['Python', 'Flask', 'React Js', 'MySQL'],
                repoUrl: 'https://github.com/Harishsbb/smart-trolley', // Placeholder if not real
                demoUrl: '',
                image: '/project-trolley.png',
                featured: true,
                date: new Date('2024-06-01')
            },
            {
                title: 'Bank Management System',
                shortDescription: 'Full stack banking application.',
                longDescription: 'Created online banking features like transactions, balance check, statements, and account management. Designed secure backend APIs and responsive UI.',
                tech: ['Python Flask', 'MySQL', 'HTML', 'CSS', 'Bootstrap'],
                repoUrl: 'https://github.com/Harishsbb/bank-management', // Placeholder
                image: '/project-bank.png',
                featured: true,
                date: new Date('2025-05-01')
            },
            {
                title: 'Solo Leveling Todo',
                shortDescription: 'Task management application.',
                longDescription: 'A dynamic todo list application inspired by the Solo Leveling series. Features task creation, deletion, and status management with a responsive interface.',
                tech: ['React Js', 'Express Js', 'MongoDB', 'Tailwind CSS'],
                repoUrl: 'https://github.com/Harishsbb/solo-leveling-todo1',
                demoUrl: 'https://solo-leveling-todo1.vercel.app',
                image: '/solo-leveling-todo.png',
                featured: true,
                date: new Date('2025-11-15')
            }
        ];

        await Project.insertMany(projects);
        console.log('Projects Seeded');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();

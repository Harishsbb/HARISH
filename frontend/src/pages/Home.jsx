import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Mail, Phone, Linkedin, Github, Code, GraduationCap, Briefcase, Award, Globe, ExternalLink, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { SiPython, SiWhatsapp, SiJavascript, SiReact, SiNodedotjs, SiExpress, SiFlask, SiMysql, SiMongodb, SiGit, SiPostman, SiFigma, SiHtml5, SiCss3, SiBootstrap, SiScikitlearn, SiNumpy, SiPandas, SiDjango } from "react-icons/si";
import { FaJava, FaNodeJs } from "react-icons/fa";
import ProjectCard from '../components/ProjectCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fetchFeaturedProjects = async () => {
    const { data } = await axios.get(`${API_URL}/projects?featured=true`);
    return data;
};

const fetchProfile = async () => {
    const { data } = await axios.get(`${API_URL}/profile`);
    return data;
};

const getSkillIcon = (skillName) => {
    const lowerSkill = skillName.toLowerCase();

    // Programming Languages
    if (lowerSkill.includes('python')) return { icon: <SiPython size={40} />, color: "text-blue-500" };
    if (lowerSkill.includes('java') && !lowerSkill.includes('script')) return { icon: <FaJava size={40} />, color: "text-red-500" };
    if (lowerSkill.includes('javascript') || lowerSkill.includes('js')) return { icon: <SiJavascript size={40} />, color: "text-yellow-400" };

    // Frontend
    if (lowerSkill.includes('react')) return { icon: <SiReact size={40} />, color: "text-cyan-400" };
    if (lowerSkill.includes('html')) return { icon: <SiHtml5 size={40} />, color: "text-orange-500" };
    if (lowerSkill.includes('css')) return { icon: <SiCss3 size={40} />, color: "text-blue-500" };
    if (lowerSkill.includes('bootstrap')) return { icon: <SiBootstrap size={40} />, color: "text-purple-600" };
    if (lowerSkill.includes('figma')) return { icon: <SiFigma size={40} />, color: "text-pink-500" };

    // Backend
    if (lowerSkill.includes('node')) return { icon: <FaNodeJs size={40} />, color: "text-green-500" };
    if (lowerSkill.includes('express')) return { icon: <SiExpress size={40} />, color: "text-gray-300" };
    if (lowerSkill.includes('flask')) return { icon: <SiFlask size={40} />, color: "text-white" };
    if (lowerSkill.includes('django')) return { icon: <SiDjango size={40} />, color: "text-green-800" };

    // Data Science / ML
    if (lowerSkill.includes('pandas')) return { icon: <SiPandas size={40} />, color: "text-indigo-400" };
    if (lowerSkill.includes('numpy')) return { icon: <SiNumpy size={40} />, color: "text-cyan-600" };
    if (lowerSkill.includes('scikit')) return { icon: <SiScikitlearn size={40} />, color: "text-orange-400" };

    // Database
    if (lowerSkill.includes('sql') || lowerSkill.includes('mysql')) return { icon: <SiMysql size={40} />, color: "text-blue-400" };
    if (lowerSkill.includes('mongo')) return { icon: <SiMongodb size={40} />, color: "text-green-500" };

    // Tools
    if (lowerSkill.includes('git')) return { icon: <SiGit size={40} />, color: "text-orange-500" };
    if (lowerSkill.includes('postman')) return { icon: <SiPostman size={40} />, color: "text-orange-600" };
    if (lowerSkill.includes('vscode') || lowerSkill.includes('code')) return { icon: <Code size={40} />, color: "text-blue-500" };

    return { icon: <Globe size={40} />, color: "text-gray-400" };
};

const Home = () => {
    const { data: projects, isLoading: projectsLoading } = useQuery({
        queryKey: ['featuredProjects'],
        queryFn: fetchFeaturedProjects
    });

    const { data: profile, isLoading: profileLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile
    });

    if (profileLoading || projectsLoading) {
        return <div className="flex justify-center items-center h-screen text-accent font-bold text-xl">Loading...</div>;
    }

    if (!profile) return <div className="text-center py-20 text-white">Profile not found.</div>;

    return (
        <div className="bg-primary min-h-screen font-sans text-gray-300">
            {/* Integrated Navbar */}
            <nav className="py-6 px-4 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold">H</div>
                    <span className="text-xl font-bold text-white">Harish</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                    <a href="#" className="text-accent">HOME</a>
                    <a href="#about" className="hover:text-accent transition-colors">ABOUT</a>
                    <a href="#projects" className="hover:text-accent transition-colors">PORTFOLIO</a>
                    <a href="#contact" className="hover:text-accent transition-colors">CONTACT</a>
                </div>
                <div className="text-accent font-bold text-sm hidden md:block">
                    {profile.phone}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-12 md:pt-20 pb-20 md:pb-32 overflow-hidden px-4 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-center md:text-left z-10 w-full"
                    >
                        <h3 className="text-accent text-lg md:text-2xl font-medium mb-2 md:mb-4">Hello, I'm</h3>
                        <h1 className="text-5xl md:text-8xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight break-words">
                            {profile.name}
                        </h1>
                        <h2 className="text-xl md:text-3xl text-gray-400 mb-6 md:mb-8 font-light">
                            {profile.title}
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-accent text-primary px-6 md:px-8 py-2 md:py-3 rounded-full font-bold text-base md:text-lg shadow-lg hover:shadow-accent/50 transition-all"
                        >
                            Hire me
                        </motion.button>

                        {/* Social Icons */}
                        <div className="mt-8 md:mt-12 flex gap-4 justify-center md:justify-start">
                            {[
                                { icon: <Linkedin size={20} />, href: profile.linkedin },
                                { icon: <Github size={20} />, href: profile.github },
                                { icon: <Mail size={20} />, href: `mailto:${profile.email}` },
                                { icon: <Phone size={20} />, href: `tel:${profile.phone}` }
                            ].map((item, i) => (
                                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="p-3 border border-white/10 rounded-full text-gray-400 hover:text-accent hover:border-accent transition-all">
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 w-full max-w-md mx-auto aspect-square rounded-full md:rounded-lg overflow-hidden border-4 border-white/5 shadow-2xl">
                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative Blob */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-0"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-0"></div>
                    </motion.div>
                </div>
            </section>

            {/* About Me Section */}
            <section id="about" className="py-20 bg-secondary/30">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col justify-center items-center mb-16">
                        <h4 className="text-accent text-lg font-bold uppercase tracking-widest mb-2">About Me</h4>
                        <h2 className="text-3xl font-bold text-white hidden">About Me</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <div className="relative">
                                <img
                                    src={profile.image}
                                    alt="About Me"
                                    className="w-full max-w-md mx-auto rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-3xl font-bold text-white mb-2">Hi There! I'm {profile.name}</h3>
                            <h4 className="text-accent text-xl mb-6">{profile.title}</h4>
                            <p className="text-gray-400 leading-relaxed mb-8 border-b border-white/10 pb-8">
                                {profile.summary}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-sm">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-white font-medium">Phone</span>
                                    <span className="text-gray-400">: {profile.phone}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-white font-medium">Email</span>
                                    <span className="text-gray-400">: {profile.email}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-white font-medium">Language</span>
                                    <span className="text-gray-400">: English, Tamil</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-white font-medium">Freelance</span>
                                    <span className="text-gray-400">: Available</span>
                                </div>
                            </div>

                            <button className="bg-accent text-primary px-8 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
                                Download CV
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services/Skills Section */}
            <section className="py-20 bg-primary">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h4 className="text-accent text-sm font-bold uppercase tracking-widest mb-2">My Skills</h4>
                        <h2 className="text-3xl font-bold text-white">Technical Expertise</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {profile.skills.map((skill, index) => {
                            const { icon, color } = getSkillIcon(skill);
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="bg-secondary/30 p-8 rounded-lg flex flex-col items-center gap-4 border border-white/5 hover:border-accent/30 transition-all group"
                                >
                                    <div className={`text-4xl ${color} group-hover:scale-110 transition-transform`}>
                                        {icon}
                                    </div>
                                    <span className="text-white font-medium text-center">{skill}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section id="projects" className="py-20 bg-secondary/20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h4 className="text-accent text-sm font-bold uppercase tracking-widest mb-2">Portfolio</h4>
                        <h2 className="text-3xl font-bold text-white"> Projects</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects?.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="py-20 bg-primary/50 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <div className="text-center mb-12">
                        <h4 className="text-accent text-sm font-bold uppercase tracking-widest mb-2">Credentials</h4>
                        <h2 className="text-3xl font-bold text-white">Certifications</h2>
                    </div>

                    <div className="bg-secondary/40 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/5 shadow-2xl">
                        <div className="space-y-4">
                            {profile.certifications?.map((cert, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    key={index}
                                    className="group flex flex-col md:flex-row md:items-center gap-4 p-5 md:p-6 bg-primary/40 hover:bg-white/5 rounded-xl transition-all duration-300 border border-white/5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                                >
                                    <div className="min-w-fit mt-1 text-accent p-3 bg-accent/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <Award size={28} />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                                            {cert.name}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-400">
                                            <span className="flex items-center gap-1.5">
                                                <Briefcase size={14} className="text-accent/70" />
                                                {cert.issuer}
                                            </span>
                                            <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-600"></span>
                                            <span className="flex items-center gap-1.5">
                                                <GraduationCap size={14} className="text-accent/70" />
                                                {cert.date}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Action Button - Optional if URL exists */}
                                    {cert.url && cert.url !== '#' && (
                                        <a
                                            href={cert.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="self-start md:self-center ml-auto px-4 py-2 bg-white/5 text-gray-300 rounded-lg text-sm font-medium hover:bg-accent hover:text-primary transition-all flex items-center gap-2 group/btn"
                                        >
                                            View
                                            <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Education & Experience */}
            <section className="py-20 bg-primary">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Education */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8 border-b-2 border-accent inline-block pb-2">Education</h3>
                            <div className="space-y-8">
                                {profile.education.map((edu, index) => (
                                    <div key={index} className="pl-8 border-l-2 border-white/10 relative">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent"></div>
                                        <span className="text-xs text-accent font-bold uppercase tracking-wider mb-1 block">{edu.year}</span>
                                        <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                                        <h5 className="text-gray-400 mb-4">{edu.institution}</h5>
                                        <p className="text-gray-500 text-sm leading-relaxed">{edu.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Experience */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8 border-b-2 border-accent inline-block pb-2">Experience</h3>
                            <div className="space-y-8">
                                {profile.experience.map((exp, index) => (
                                    <div key={index} className="pl-8 border-l-2 border-white/10 relative">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent"></div>
                                        <span className="text-xs text-accent font-bold uppercase tracking-wider mb-1 block">{exp.duration}</span>
                                        <h4 className="text-xl font-bold text-white mb-1">{exp.role}</h4>
                                        <h5 className="text-gray-400 mb-4">{exp.company}</h5>
                                        <p className="text-gray-500 text-sm leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

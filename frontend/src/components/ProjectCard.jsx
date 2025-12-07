import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-secondary/40 rounded-xl overflow-hidden border border-white/5 shadow-lg backdrop-blur-sm group"
        >
            <div className="relative h-48 overflow-hidden">
                {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                        />
                    </a>
                ) : (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                    <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
                        {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary/80 rounded-full hover:bg-accent hover:text-primary transition-colors">
                                <Github size={20} />
                            </a>
                        )}
                        {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary/80 rounded-full hover:bg-accent hover:text-primary transition-colors">
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-2 text-sm">{project.shortDescription || project.description}</p>

                <div className="flex flex-wrap gap-2">
                    {(project.tech || []).slice(0, 4).map((tech, index) => (
                        <span key={index} className="text-xs font-medium px-2 py-1 bg-primary/50 text-accent rounded-full border border-accent/20">
                            {tech}
                        </span>
                    ))}
                    {(project.tech || []).length > 4 && (
                        <span className="text-xs font-medium px-2 py-1 bg-primary/50 text-gray-400 rounded-full border border-white/5">
                            +{(project.tech || []).length - 4}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;

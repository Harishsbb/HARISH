import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';

const fetchProjects = async (filter) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const { data } = await axios.get(`${API_URL}/api/projects${filter}`);
    return data;
};

const Projects = () => {
    const [filter, setFilter] = useState('');

    const { data: projects, isLoading, error } = useQuery({
        queryKey: ['projects', filter],
        queryFn: () => fetchProjects(filter ? `?tech=${filter}` : '')
    });

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error loading projects</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setFilter('')}
                    className={`px-4 py-2 rounded-full ${filter === '' ? 'bg-accent text-primary' : 'bg-secondary text-white'}`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('React')}
                    className={`px-4 py-2 rounded-full ${filter === 'React' ? 'bg-accent text-primary' : 'bg-secondary text-white'}`}
                >
                    React
                </button>
                <button
                    onClick={() => setFilter('Node.js')}
                    className={`px-4 py-2 rounded-full ${filter === 'Node.js' ? 'bg-accent text-primary' : 'bg-secondary text-white'}`}
                >
                    Node.js
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default Projects;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ title: '', shortDescription: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchProjects();
        }
    }, [navigate]);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/admin/projects', formData, {
                headers: { 'x-auth-token': token }
            });
            setFormData({ title: '', shortDescription: '' });
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/admin/projects/${id}`, {
                headers: { 'x-auth-token': token }
            });
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="bg-secondary p-6 rounded-lg mb-8">
                <h2 className="text-xl font-bold mb-4">Add New Project</h2>
                <form onSubmit={handleAddProject} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-primary p-2 rounded text-white"
                    />
                    <input
                        type="text"
                        placeholder="Short Description"
                        value={formData.shortDescription}
                        onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                        className="w-full bg-primary p-2 rounded text-white"
                    />
                    <button type="submit" className="bg-accent text-primary px-4 py-2 rounded font-bold">
                        Add Project
                    </button>
                </form>
            </div>

            <div className="grid gap-4">
                {projects.map((p) => (
                    <div key={p._id} className="bg-secondary p-4 rounded flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{p.title}</h3>
                            <p className="text-sm text-gray-400">{p.shortDescription}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(p._id)}
                            className="bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500/40"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;

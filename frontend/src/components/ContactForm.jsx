import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');

    const mutation = useMutation({
        mutationFn: (newContact) => {
            return axios.post('http://localhost:5000/api/contact', newContact);
        },
        onSuccess: () => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        },
        onError: () => {
            setStatus('error');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-secondary p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-white">Get in Touch</h2>

            {status === 'success' && (
                <div className="bg-green-500/20 text-green-400 p-3 rounded mb-4">
                    Message sent successfully!
                </div>
            )}
            {status === 'error' && (
                <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4">
                    Failed to send message. Please try again.
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-primary border border-slate-600 rounded p-2 text-white focus:border-accent focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-primary border border-slate-600 rounded p-2 text-white focus:border-accent focus:outline-none"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-primary border border-slate-600 rounded p-2 text-white focus:border-accent focus:outline-none"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-accent text-primary font-bold py-2 px-4 rounded hover:bg-sky-300 transition-colors disabled:opacity-50"
            >
                {mutation.isPending ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
};

export default ContactForm;

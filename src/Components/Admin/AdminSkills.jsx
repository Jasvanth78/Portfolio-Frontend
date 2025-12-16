import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config';

export default function AdminSkills() {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ name: '', image: '', category: 'frontend' });

    const fetchSkills = () => {
        fetch(`${API_BASE_URL}/api/skills`)
            .then(res => res.json())
            .then(data => setSkills(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/skills`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setFormData({ name: '', image: '', category: 'frontend' });
                fetchSkills();
                alert('Skill added!');
            } else {
                alert('Failed to add skill');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/skills/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                fetchSkills();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Manage Skills</h2>

            <form onSubmit={handleSubmit} className="mb-10 bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                <div className="mb-4">
                    <label className="block mb-2">Skill Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2 bg-black border border-gray-700 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Image URL</label>
                    <input
                        type="text"
                        value={formData.image}
                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                        className="w-full p-2 bg-black border border-gray-700 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Category</label>
                    <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-2 bg-black border border-gray-700 rounded"
                    >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="tools">Tools</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Add Skill</button>
            </form>

            <div className="grid gap-4">
                {skills.map(skill => (
                    <div key={skill.id} className="flex items-center justify-between bg-neutral-900 p-4 rounded border border-neutral-800">
                        <div className="flex items-center gap-4">
                            <img src={skill.image} alt={skill.name} className="w-12 h-12 object-contain" />
                            <div>
                                <p className="font-bold">{skill.name}</p>
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-800">{skill.category || 'frontend'}</span>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(skill.id)} className="text-red-500 hover:text-red-400">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

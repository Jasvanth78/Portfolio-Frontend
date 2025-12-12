import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config';

export default function AdminQuotes() {
    const [quotes, setQuotes] = useState([]);
    const [formData, setFormData] = useState({ text: '', author: '', image: null });

    const fetchQuotes = () => {
        fetch(`${API_BASE_URL}/api/quotes`)
            .then(res => res.json())
            .then(data => setQuotes(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('text', formData.text);
        data.append('author', formData.author);
        if (formData.image) data.append('image', formData.image);

        try {
            // Assuming token is stored in localStorage, adjust if needed
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/quotes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });
            if (res.ok) {
                setFormData({ text: '', author: '', image: null });
                fetchQuotes();
                alert('Quote added!');
            } else {
                alert('Failed to add quote');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/quotes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                fetchQuotes();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Manage Quotes</h2>

            <form onSubmit={handleSubmit} className="mb-10 bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                <div className="mb-4">
                    <label className="block mb-2">Quote Text</label>
                    <textarea
                        value={formData.text}
                        onChange={e => setFormData({ ...formData, text: e.target.value })}
                        className="w-full p-2 bg-black border border-gray-700 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Author</label>
                    <input
                        type="text"
                        value={formData.author}
                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                        className="w-full p-2 bg-black border border-gray-700 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Image</label>
                    <input
                        type="file"
                        onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
                        className="w-full p-2 bg-black border border-gray-700 rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Add Quote</button>
            </form>

            <div className="grid gap-4">
                {quotes.map(quote => (
                    <div key={quote.id} className="flex items-center justify-between bg-neutral-900 p-4 rounded border border-neutral-800">
                        <div className="flex items-center gap-4">
                            {quote.image && (
                                <img src={`${API_BASE_URL}${quote.image}`} alt={quote.author} className="w-12 h-12 rounded-full object-cover" />
                            )}
                            <div>
                                <p className="italic">"{quote.text}"</p>
                                <p className="text-sm text-gray-400">- {quote.author}</p>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(quote.id)} className="text-red-500 hover:text-red-400">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

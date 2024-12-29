import React, { useState } from 'react';
import API from '../utils/api';

const TicketForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Open'); // Default status

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('tickets/', {
                title,
                description,
                status,
            });
            alert('Ticket created successfully!');
            console.log('Created Ticket:', response.data);
        } catch (error) {
            console.error('Error creating ticket:', error.response?.data || error.message);
            alert('Failed to create ticket. Check the console for details.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
            <button type="submit">Create Ticket</button>
        </form>
    );
};

export default TicketForm;

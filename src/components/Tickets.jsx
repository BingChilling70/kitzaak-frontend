import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await API.get('tickets/');
                setTickets(response.data.results); // Use 'results' for paginated responses
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tickets:', error.response?.data || error.message);
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) {
        return <p>Loading tickets...</p>;
    }

    return (
        <div>
            <h1>Your Tickets</h1>
            {tickets.length > 0 ? (
                tickets.map((ticket) => (
                    <div key={ticket.id}>
                        <h2>{ticket.title}</h2>
                        <p>{ticket.description}</p>
                        <p>Status: {ticket.status}</p>
                    </div>
                ))
            ) : (
                <p>No tickets found.</p>
            )}
        </div>
    );
};

export default Tickets;

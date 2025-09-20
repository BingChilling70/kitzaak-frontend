import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const response = await API.get('tickets/');
            setTickets(response.data.results);
        };

        fetchTickets();
    }, []);

    return (
        <div>
            <h1>My Tickets</h1>
            <ul>
                {tickets.map((ticket) => (
                    <li key={ticket.id}>
                        {ticket.title} - {ticket.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyTickets;

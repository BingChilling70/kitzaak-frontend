import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const Stats = () => {
    const [stats, setStats] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await API.get('tickets/stats/');
                setStats(response.data);
            } catch (err) {
                console.error('Error fetching stats:', err);
                setError(err.message);
            }
        };

        fetchStats();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!stats.length) {
        return <div>No stats available.</div>;
    }

    return (
        <div>
            <h1>Ticket Statistics</h1>
            <ul>
                {stats.map(({ status, count }) => (
                    <li key={status}>
                        {status}: {count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Stats;

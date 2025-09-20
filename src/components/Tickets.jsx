// src/components/Tickets.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import '../styles/tickets.css';

const statusClass = (s) => {
  if (!s) return 'pill';
  const k = s.toLowerCase();
  if (k.includes('progress')) return 'pill pill--progress';
  if (k.includes('closed')) return 'pill pill--closed';
  return 'pill pill--open';
};

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const { data } = await API.get('tickets/');
      setTickets(Array.isArray(data?.results) ? data.results : []);
    } catch (e) {
      setErr(e?.response?.data || e?.message || 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="tickets__state">Loading…</div>;
  if (err) return <div className="tickets__state tickets__state--error">Error: {JSON.stringify(err)}</div>;
  if (!tickets.length) return <div className="tickets__state">No tickets yet.</div>;

  return (
    <div className="tickets">
      <div className="tickets__header">
        <h2>My Tickets</h2>
        <button className="btn btn--ghost" onClick={load}>Refresh</button>
      </div>

      <div className="tickets__grid">
        {tickets.map((t) => (
          <div key={t.id} className="ticket">
            <div className="ticket__top">
              <span className="ticket__id">{t.ticket_number || `#${t.id}`}</span>
              <span className={statusClass(t.status)}>{t.status}</span>
            </div>

            <div className="ticket__row">
              <span className="label">Category</span>
              <span className="value">{t.category || '—'}</span>
            </div>

            <div className="ticket__row">
              <span className="label">Address</span>
              <span className="value">{t.address || '—'}</span>
            </div>

            <div className="ticket__row">
              <span className="label">Preferred date</span>
              <span className="value">{t.preferred_date || '—'}</span>
            </div>

            <div className="ticket__row">
              <span className="label">Length</span>
              <span className="value">{t.length_m != null ? `${t.length_m} m` : '—'}</span>
            </div>

            <div className="ticket__footer">
              <span className="muted">
                Created {new Date(t.created_at).toLocaleDateString()}
              </span>

              {/* Link to details page using numeric ID (matches DRF /api/tickets/:id/) */}
              <Link className="btn" to={`/tickets/${t.id}`}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;

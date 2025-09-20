// src/pages/TicketDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';
import '../styles/ticket-details.css';

const pretty = (d) => (d ? new Date(d).toLocaleString() : '—');

const TicketDetails = () => {
  const { id } = useParams();           // numeric id from /tickets/:id
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const { data } = await API.get(`tickets/${id}/`);
      setTicket(data);
    } catch (e) {
      setErr(e?.response?.data || e?.message || 'Failed to load ticket');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return <div className="td__state">Loading…</div>;
  if (err) return (
    <div className="td__state td__state--error">
      Error: {JSON.stringify(err)}
      <div style={{ marginTop: 12 }}>
        <button className="btn btn--ghost" onClick={() => navigate(-1)}>Go back</button>
      </div>
    </div>
  );
  if (!ticket) return <div className="td__state">Not found.</div>;

  return (
    <div className="td">
      <div className="td__header">
        <div>
          <h2>{ticket.ticket_number || `Ticket #${ticket.id}`}</h2>
          <div className="td__sub">Created {pretty(ticket.created_at)}</div>
        </div>
        <div className="td__actions">
          <Link className="btn btn--ghost" to="/tickets">All tickets</Link>
          <button className="btn" onClick={load}>Refresh</button>
        </div>
      </div>

      <div className="td__grid">
        <section className="card">
          <h3>Summary</h3>
          <div className="kv">
            <span className="k">Status</span>
            <span className="v">{ticket.status || '—'}</span>
          </div>
          <div className="kv">
            <span className="k">Category</span>
            <span className="v">{ticket.category || '—'}</span>
          </div>
          <div className="kv">
            <span className="k">Address</span>
            <span className="v">{ticket.address || '—'}</span>
          </div>
          <div className="kv">
            <span className="k">Preferred date</span>
            <span className="v">{ticket.preferred_date || '—'}</span>
          </div>
          <div className="kv">
            <span className="k">Length</span>
            <span className="v">{ticket.length_m != null ? `${ticket.length_m} m` : '—'}</span>
          </div>
          <div className="kv">
            <span className="k">Updated</span>
            <span className="v">{pretty(ticket.updated_at)}</span>
          </div>
        </section>

        <section className="card">
          <h3>Customer instructions</h3>
          <p className="instructions">{ticket.instructions || '—'}</p>
        </section>

        <section className="card">
          <h3>Photos</h3>
          {!ticket.images?.length ? (
            <div className="muted">No photos uploaded.</div>
          ) : (
            <div className="gallery">
              {ticket.images.map((img) => (
                <a
                  key={img.id}
                  className="gallery__item"
                  href={img.image}
                  target="_blank"
                  rel="noreferrer"
                  title="Open full image"
                >
                  <img src={img.image} alt={`Ticket ${ticket.ticket_number || ticket.id}`} />
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TicketDetails;

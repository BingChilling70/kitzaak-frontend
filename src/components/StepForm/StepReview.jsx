import React from 'react';
import '../../styles/stepform.css';

export default function StepReview({ formData, handleSubmit, prevStep, submitting }) {
  return (
    <div className="step-form">
      <h2>Review Your Ticket</h2>
      <p><strong>Address:</strong> {formData.address || '—'}</p>
      <p><strong>Category:</strong> {formData.category || '—'}</p>
      <p><strong>Length:</strong> {formData.length || '—'}</p>
      <p><strong>Date:</strong> {formData.date || '—'}</p>
      <p><strong>Pictures:</strong> {(formData.pictures || []).length} uploaded</p>

      <div className="step-buttons">
        <button type="button" onClick={prevStep} disabled={submitting}>Back</button>
        <button type="button" onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit Ticket'}
        </button>
      </div>
    </div>
  );
}

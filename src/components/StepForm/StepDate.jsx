import React from 'react';
import '../../styles/stepForm.css';

const StepDate = ({ formData, handleInputChange, nextStep, prevStep }) => {
    return (
        <div className="step-container">
            <h2>Step 5: Pick a Date</h2>
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="step-input"
            />
            <div className="step-actions">
                <button className="btn-secondary" onClick={prevStep}>Back</button>
                <button className="btn-primary" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
};

export default StepDate;

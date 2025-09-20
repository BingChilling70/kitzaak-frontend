import React from 'react';
import '../../styles/stepForm.css';

const StepLength = ({ formData, handleInputChange, nextStep, prevStep }) => {
    return (
        <div className="step-container">
            <h2>Step 3: Length (Optional)</h2>
            <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleInputChange}
                placeholder="Length in meters"
                className="step-input"
            />
            <div className="step-actions">
                <button className="btn-secondary" onClick={prevStep}>Back</button>
                <button className="btn-primary" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
};

export default StepLength;

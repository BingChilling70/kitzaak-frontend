import React from 'react';
import '../../styles/stepForm.css';

const StepAddress = ({ formData, handleInputChange, nextStep }) => {
    return (
        <div className="step-container">
            <h2>Step 1: Your Address</h2>
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="step-input"
            />
            <div className="step-actions">
                <button className="btn-primary" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
};

export default StepAddress;

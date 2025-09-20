import React from 'react';
import '../../styles/stepForm.css';

const StepInstructions = ({ formData, handleInputChange, nextStep, prevStep }) => {
    return (
        <div className="step-container">
            <h2>Step 6: Special Instructions</h2>
            <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                placeholder="Tell us about your needs..."
                className="step-textarea"
            />
            <div className="step-actions">
                <button className="btn-secondary" onClick={prevStep}>Back</button>
                <button className="btn-primary" onClick={nextStep}>Submit</button>
            </div>
        </div>
    );
};

export default StepInstructions;

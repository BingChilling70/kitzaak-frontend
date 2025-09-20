import React from 'react';
import '../../styles/stepForm.css';

const StepPictures = ({ handleFileUpload, nextStep, prevStep }) => {
    return (
        <div className="step-container">
            <h2>Step 4: Upload Pictures (Optional)</h2>
            <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="step-input"
            />
            <div className="step-actions">
                <button className="btn-secondary" onClick={prevStep}>Back</button>
                <button className="btn-primary" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
};

export default StepPictures;

import React from 'react';
import '../../styles/stepForm.css';

const StepCategory = ({ formData, handleInputChange, nextStep, prevStep }) => {
    const categories = ['Bathroom', 'Kitchen', 'Shower', 'Other'];

    return (
        <div className="step-container">
            <h2>Step 2: What needs sealing?</h2>
            <div className="category-options">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`category-btn ${formData.category === cat ? 'selected' : ''}`}
                        onClick={() => handleInputChange({ target: { name: 'category', value: cat } })}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="step-actions">
                <button className="btn-secondary" onClick={prevStep}>Back</button>
                <button className="btn-primary" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
};

export default StepCategory;

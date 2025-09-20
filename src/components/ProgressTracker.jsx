import React from 'react';
import './FormStyles.css';

const ProgressTracker = ({ currentStep, steps }) => {
    return (
        <div className="progress-tracker">
            {Array.from({ length: steps }).map((_, index) => (
                <div
                    key={index}
                    className={`step ${index <= currentStep ? 'active' : ''}`}
                ></div>
            ))}
        </div>
    );
};

export default ProgressTracker;

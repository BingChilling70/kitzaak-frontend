import React from 'react';
import '../../styles/stepform.css';

const ProgressBar = ({ step, totalSteps }) => {
    const progress = (step / totalSteps) * 100;

    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default ProgressBar;

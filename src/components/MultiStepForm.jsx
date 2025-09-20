import React, { useState } from 'react';
import AddressStep from './steps/AddressStep';
import KitLocationStep from './steps/KitLocationStep';
import LengthStep from './steps/LengthStep';
import PicturesStep from './steps/PicturesStep';
import DateStep from './steps/DateStep';
import ProgressTracker from './ProgressTracker';

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        address: '',
        kitLocation: '',
        length: '',
        pictures: [],
        date: ''
    });

    const steps = [
        <AddressStep formData={formData} setFormData={setFormData} />,
        <KitLocationStep formData={formData} setFormData={setFormData} />,
        <LengthStep formData={formData} setFormData={setFormData} />,
        <PicturesStep formData={formData} setFormData={setFormData} />,
        <DateStep formData={formData} setFormData={setFormData} />,
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        // Make an API call to submit data
    };

    return (
        <div className="multi-step-form">
            <ProgressTracker currentStep={currentStep} steps={steps.length} />
            {steps[currentStep]}
            <div className="form-navigation">
                {currentStep > 0 && <button onClick={handlePrevious}>Back</button>}
                {currentStep < steps.length - 1 ? (
                    <button onClick={handleNext}>Next</button>
                ) : (
                    <button onClick={handleSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;

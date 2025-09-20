import React, { useState } from 'react';
import API from '../utils/api';
import StepAddress from '../components/StepForm/StepAddress';
import StepCategory from '../components/StepForm/StepCategory';
import StepLength from '../components/StepForm/StepLength';
import StepPictures from '../components/StepForm/StepPictures';
import StepDate from '../components/StepForm/StepDate';
import StepInstructions from '../components/StepForm/StepInstructions';

const CreateTicketFlow = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        address: '',
        category: '',
        length: '',
        pictures: [],
        date: '',
        instructions: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e) => {
        setFormData((prev) => ({ ...prev, pictures: e.target.files }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const payload = new FormData();
            payload.append('address', formData.address);
            payload.append('category', formData.category);
            if (formData.length) payload.append('length_m', formData.length);
            if (formData.date) payload.append('preferred_date', formData.date);
            if (formData.instructions) payload.append('instructions', formData.instructions);

            // Append pictures if any
            if (formData.pictures && formData.pictures.length > 0) {
                Array.from(formData.pictures).forEach((file) => {
                    payload.append('images', file);
                });
            }

            await API.post('tickets/', payload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSuccess('Ticket created successfully!');
            setFormData({
                address: '',
                category: '',
                length: '',
                pictures: [],
                date: '',
                instructions: ''
            });
            setStep(1); // reset to first step
        } catch (err) {
            setError(err.response?.data || 'Submit failed');
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        <StepAddress
            key="step1"
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
        />,
        <StepCategory
            key="step2"
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
            prevStep={prevStep}
        />,
        <StepLength
            key="step3"
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
            prevStep={prevStep}
        />,
        <StepPictures
            key="step4"
            handleFileUpload={handleFileUpload}
            nextStep={nextStep}
            prevStep={prevStep}
        />,
        <StepDate
            key="step5"
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
            prevStep={prevStep}
        />,
        <StepInstructions
            key="step6"
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={handleSubmit}
            prevStep={prevStep}
        />
    ];

    return (
        <div className="create-ticket-flow">
            <h1>Create a New Ticket</h1>
            {loading && <p>Submitting...</p>}
            {error && <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {steps[step - 1]}
        </div>
    );
};

export default CreateTicketFlow;

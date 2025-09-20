import React from 'react';

const AddressStep = ({ formData, setFormData }) => {
    return (
        <div>
            <h2>Enter Your Address</h2>
            <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter or confirm your address"
            />
        </div>
    );
};

export default AddressStep;

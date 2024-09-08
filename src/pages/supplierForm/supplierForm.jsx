import React, { useState } from 'react';
import StandardForm from '../../components/standardForm/standarForm';

const SupplierForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [error, setError] = useState(null);

    const formFields = [
        { name: 'name', label: 'Supplier Name', type: 'text', placeholder: 'Enter supplier name', required: true },
        { name: 'phone', label: 'Phone', type: 'text', placeholder: 'Enter phone number' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address' },
        { name: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter address' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        setSubmissionStatus(null); // Clear previous status

        try {
            const response = await fetch('http://localhost:8080/api/suppliers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create supplier. Please check the data and try again.');
            }

            setSubmissionStatus('Supplier created successfully.');
            setFormData({
                name: '',
                phone: '',
                email: '',
                address: '',
            });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <StandardForm
            formData={formData}
            formFields={formFields}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            submissionStatus={submissionStatus}
            error={error}
        />
    );
};

export default SupplierForm;

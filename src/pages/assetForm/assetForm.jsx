import React, { useState } from 'react';
import StandardForm from '../../components/standardForm/standarForm';

const AssetForm = () => {
    const [formData, setFormData] = useState({
        purchase_date: '',
        value: '',
        responsible_id: '',
        supplier_id: '',
        category_id: '',
        brand_id: '',
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [error, setError] = useState(null);

    const formFields = [
        { name: 'purchase_date', label: 'Purchase Date', type: 'date', placeholder: 'Enter purchase date', required: true },
        { name: 'value', label: 'Value', type: 'number', placeholder: 'Enter asset value', required: true },
        { name: 'responsible_id', label: 'Responsible ID', type: 'number', placeholder: 'Enter responsible person ID', required: true },
        { name: 'supplier_id', label: 'Supplier ID', type: 'number', placeholder: 'Enter supplier ID', required: true },
        { name: 'category_id', label: 'Category ID', type: 'number', placeholder: 'Enter category ID', required: true },
        { name: 'brand_id', label: 'Brand ID', type: 'number', placeholder: 'Enter brand ID', required: true },
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
            const response = await fetch('http://localhost:8080/api/assets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create asset. Please check the data and try again.');
            }

            setSubmissionStatus('Asset created successfully.');
            setFormData({
                purchase_date: '',
                value: '',
                responsible_id: '',
                supplier_id: '',
                category_id: '',
                brand_id: '',
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

export default AssetForm;

import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './AddBrand.css';

const AddBrand = () => {
    const [name, setName] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBrand = {
            id: 0,
            name
        };

        fetch('http://localhost:8080/brand', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBrand)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setShowSuccessAlert(true);
                setName('');
            })
            .catch(error => {
                console.error('Error adding brand:', error);
                setShowErrorAlert(true);
            });
    };

    return (
        <div className="main-container">
            <h1>Add Brand</h1>
            <div className="container2">
                <div className="container3">
                    <h3>Brand Details</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="button">
                            <Button className="button-5" type="submit" role="button">
                                Save
                            </Button>
                        </div>
                    </form>

                    {/* Success Alert */}
                    {showSuccessAlert && (
                        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                            Brand added successfully!
                        </Alert>
                    )}

                    {/* Error Alert */}
                    {showErrorAlert && (
                        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                            There was an error adding the brand. Please try again.
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddBrand;

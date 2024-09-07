import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ show, onHide }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/logout', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            // Clear user session or any required cleanup
            // For example, clearing local storage or cookies
            // localStorage.removeItem('user');
            // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT';

            // Navigate to login page
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to logout. Please try again.');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Ready to Leave?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Select "Logout" below if you are ready to end your current session.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LogoutModal;

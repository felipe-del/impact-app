import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePage } from '../../context/pageContext';
import { API_URLS } from '../../declarations/apiConfig';
import './users.css';

const Users = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // Nuevo estado para el mensaje de éxito
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [state, setState] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState('');
    const [roles, setRoles] = useState([]); 

    const formRef = useRef(null);
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Gestión de usuarios");
    }, [setPageName]);

    const fetchData = async () => {
        try {
            const userResponse = await fetch('http://localhost:8080/user/inactive', { method: 'GET', credentials: 'include' });
            if (!userResponse.ok) throw new Error('Network response was not ok for users');
            const userData = await userResponse.json();
            setUsers(userData);

            const rolesResponse = await fetch('http://localhost:8080/user/roles', { method: 'GET', credentials: 'include' });
            if (!rolesResponse.ok) throw new Error('Network response was not ok for roles');
            const rolesData = await rolesResponse.json();
            setRoles(rolesData);
        } catch (error) {
            console.error('Fetch error:', error);
            setShowErrorModal(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUserChange = (e) => {
        const selectedUserId = e.target.value;
        setUser(selectedUserId);

        const selectedUser = users.find((user) => user.id.toString() === selectedUserId);
        
        if (selectedUser) {
            console.log("Selected User:", selectedUser);
            setRole(selectedUser.role || '');
            setState(selectedUser.state || '');
        } else {
            console.log("User not found for ID:", selectedUserId);
            setRole('');
            setState('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8080/user/${user}/role`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([{ role }]),  
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setSuccessMessage('El usuario ha sido aceptado exitosamente.'); 
            setShowSuccessModal(true);
            fetchData(); 
        }catch(error){
            console.error('Error updating user role:', error);
            setShowErrorModal(true);
        }

        setName('');
        setRole('');
        setState('');
        setUser('');
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    const handleCancel = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8080/user/${user}/reject`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }, 
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setSuccessMessage('El usuario ha sido rechazado exitosamente.'); 
            setShowSuccessModal(true);
            fetchData(); 
        }catch(error){
            console.error('Error rejecting user:', error);
            setShowErrorModal(true);
        }

        setName('');
        setRole('');
        setState('');
        setUser('');
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/app">Inicio</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Gestión de solicitudes de registro de nuevos usuarios</li>
                </ol>
            </nav>

            <div className="mt-5 d-flex justify-content-center">
                <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                    <h1 className="title text-center mb-5">Solicitudes de Nuevos Usuarios</h1>

                    <div className="container2">
                        <div className="container3">
                            <h3 className="text-center mb-4 subtitle">Datos del Usuario</h3>
                            <form onSubmit={handleSubmit} ref={formRef}>
                                <div className="mb-4 row align-items-center">
                                    <label htmlFor="name" className="col-sm-4 col-form-label form-label">
                                        <i className="fas fa-user"></i> Usuario
                                    </label>
                                    <div className="col-sm-8">
                                        <select
                                            id="user"
                                            className="form-select border-primary"
                                            value={user}
                                            onChange={handleUserChange}
                                            required
                                        >
                                            <option value="">Seleccionar usuario</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name} ({user.email})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4 row align-items-center">
                                    <label htmlFor="role" className="col-sm-4 col-form-label form-label">
                                        <i className="fas fa-id-card"></i> Rol de Usuario
                                    </label>
                                    <div className="col-sm-8">
                                        <select
                                            id="role"
                                            className="form-select border-primary"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)} 
                                            required
                                        >
                                            <option value="">Seleccionar rol</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.name}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4 row align-items-center">
                                    <label htmlFor="state" className="col-sm-4 col-form-label form-label">
                                        <i className="fas fa-cube"></i> Estado de Usuario
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            id="state"
                                            className="form-control border-primary"
                                            value={state}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="text-center buttons">
                                    <Button className="btn btn-danger btn-lg w-100 shadow-sm btn-custom" id='cancel' onClick={handleCancel}>
                                        <i className="fas fa-times"></i> Rechazar
                                    </Button>
                                    <Button className="btn btn-lg btn-custom w-100 shadow-sm" type="submit" onClick={handleSubmit}>
                                        <i className="fas fa-save"></i> Aceptar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Success Modal */}
                    <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Éxito</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{successMessage}</Modal.Body> {/* Mensaje dinámico */}
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>Cerrar</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Error Modal */}
                    <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Error</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Hubo un problema al guardar el usuario. Por favor, intente nuevamente.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowErrorModal(false)}>Cerrar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Users;

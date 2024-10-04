import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assetLoanRequest.css';
import { API_URLS } from '../../../declarations/apiConfig';
import { usePage } from '../../../context/pageContext';

const AssetLoanRequest = () => {
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState('');
    const [reason, setReason] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const formRef = useRef(null);

    const userId = sessionStorage.getItem('userId'); // Reemplaza con tu método para obtener el userId
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Solicitar Activo");
    }, [setPageName]);

    useEffect(() => {
        // Fetch the available assets from the API
        fetch(API_URLS.ASSET.GET_ALL)
            .then(response => response.json())
            .then(data => {
                setAssets(data);
            })
            .catch(error => {
                console.error('Error fetching assets:', error);
                setShowErrorAlert(true);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedAsset || !reason || !expirationDate) {
            setShowErrorAlert(true);
            return;
        }

        const loanRequest = {
            id: 0, // Deja null para que la API lo genere automáticamente
            requestId: 0, // Igual que arriba
            assetId: parseInt(selectedAsset),
            statusId: 1, // 1 es el ID del estado "Pendiente"
            expirationDate: expirationDate,
            reason: reason,
        };
        console.log(loanRequest)
    
        fetch(API_URLS.ASSET.SAVE_ASSET_REQUEST, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loanRequest) // Asegúrate de enviar el objeto como JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setShowSuccessAlert(true);
                setSelectedAsset('');
                setReason('');
                setExpirationDate('');
                if (formRef.current) {
                    formRef.current.reset();
                }
            })
            .catch(error => {
                console.error('Error while submitting loan request:', error);
                setShowErrorAlert(true);
            });
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "900px", borderRadius: "10px" }}>
                <h1 id="loan-request-title" className="text-center mb-5">Solicitud de Préstamo de Activo</h1>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="assetSelect" className="form-label">
                            <i className="fas fa-car" id="icon-plate-number"></i> Seleccione el Activo
                        </label>
                        <select
                            id="assetSelect"
                            className="form-select border-primary"
                            value={selectedAsset}
                            onChange={(e) => setSelectedAsset(e.target.value)}
                            required
                        >
                            <option value="">Seleccione un activo</option>
                            {assets.map(asset => (
                                <option key={asset.id} value={asset.id}>
                                    {asset.name} - {asset.plateNumber}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="purpose" className="form-label">
                            <i className="fas fa-file-alt" id="icon-purpose"></i> Propósito de la Solicitud
                        </label>
                        <textarea
                            id="purpose"
                            className="form-control border-primary"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="expirationDate" className="form-label">
                            <i className="fas fa-calendar-alt" id="icon-expiration-date"></i> Fecha de Finalización del Préstamo
                        </label>
                        <input
                            type="date"
                            id="expirationDate"
                            className="form-control border-primary"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="btn btn-primary w-100">Enviar Solicitud</Button>
                </form>

                {showSuccessAlert && <div className="alert alert-success mt-3">Solicitud de préstamo registrada exitosamente!</div>}
                {showErrorAlert && <div className="alert alert-danger mt-3">Error al registrar la solicitud</div>}
            </div>
        </div>
    );
};

export default AssetLoanRequest;

import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { usePage } from '../../../context/pageContext';
import { API_URLS } from '../../../declarations/apiConfig';

const AddLocationNumber = () => {
    const [locationNumber, setNumber] = useState('');
    const [locationTypes, setLocationTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Agregar Número de Ubicación");
        fetchLocationTypes();
    }, [setPageName]);

    const fetchLocationTypes = () => {
        fetch(API_URLS.ASSET.GET_ALL_LOCATION_TYPE, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setLocationTypes(data))
            .catch(error => console.error('Error fetching location types:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newLocationNumber = {
            id: 0,
            locationNumber,
            locationType: selectedType
        };

        fetch(API_URLS.ASSET.ADD_NEW_LOCATION_NUMBER, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLocationNumber)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setShowSuccessAlert(true);
                setNumber('');
                setSelectedType('');
            })
            .catch(error => {
                console.error('Error adding location number:', error);
                setShowErrorAlert(true);
            });
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 id="location-number-title" className="text-center mb-5">Agregar Número de Ubicación</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 row align-items-center">
                        <label htmlFor="number" id="label-number" className="col-sm-4 col-form-label form-label">
                            <i className="fas fa-hashtag" id="icon-number"></i> Número
                        </label>
                        <div className="col-sm-8 w-100 mb-4">
                            <input
                                type="text"
                                id="number"
                                className="form-control border-primary"
                                placeholder="Ingresa el número de ubicación"
                                value={locationNumber}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4 row align-items-center">
                        <label htmlFor="locationType" className="col-sm-4 col-form-label form-label">
                            <i className="fas fa-map-marker-alt"></i> Tipo de Ubicación
                        </label>
                        <div className="col-sm-8 w-100 mb-4">
                            <select
                                id="locationType"
                                className="form-select border-primary"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                required
                            >
                                <option value="">Seleccione un tipo</option>
                                {locationTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.typeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button className="btn btn-lg btn-custom w-100 shadow-sm" type="submit">
                            <i className="fas fa-save"></i> Guardar
                        </Button>
                    </div>
                </form>

                {showSuccessAlert && (
                    <div className="alert alert-success mt-4 text-center" role="alert">
                        Número de ubicación ingresado correctamente!
                    </div>
                )}

                {showErrorAlert && (
                    <div className="alert alert-danger mt-5 text-center" role="alert">
                        Se produjo un error al agregar el número de ubicación. Por favor inténtalo de nuevo.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddLocationNumber;
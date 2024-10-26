import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import InputMask from 'react-input-mask'; // Import InputMask
import 'bootstrap/dist/css/bootstrap.min.css';
import './addSupplier.css';
import { usePage } from '../../../context/pageContext';
import ConfirmationModal from '../../../components/confirmation/ConfirmationModal';
import SuccessModal from '../../../components/modal/success/SuccessModal';
import ErrorModal from '../../../components/modal/error/ErrorModal';

const AddSupplier = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [clientContact, setClientContact] = useState('');
    const [idNumber, setIdNumber] = useState(''); // State for ID number
    const [entityTypes, setEntityTypes] = useState([]);
    const [selectedEntityType, setSelectedEntityType] = useState(null);
    const [idMask, setIdMask] = useState(''); // Mask for the ID number
    const { setPageName } = usePage();

    // Modal states
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        setPageName("Agregar Proveedor");
    }, [setPageName]);

    useEffect(() => {
        fetch('http://localhost:8080/supplier/allEntityType')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEntityTypes(data);
            })
            .catch(error => {
                console.error('Error fetching entity types:', error);
            });
    }, []);

    // Handle entity type change and update ID mask
    const handleEntityTypeChange = (e) => {
        const entityTypeId = e.target.value;
        setSelectedEntityType(entityTypeId);

        // Update mask based on entity type (e.g., physical or legal entity)
        if (entityTypeId === '1') { // Assuming 1 is for "Física"
            setIdMask('9-999-999'); // Example mask for physical person
        } else if (entityTypeId === '2') { // Assuming 2 is for "Jurídica"
            setIdMask('9-999-999999'); // Example mask for legal entity
        } else {
            setIdMask(''); // Default mask if no entity type is selected
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmationModal(true); // Show confirmation modal
    };

    // Function to format phone number
    const formatPhoneNumber = (value) => {
        const phoneNumber = value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
        const formattedNumber = phoneNumber.replace(/(\d{4})(\d{4})/, '$1-$2'); // Formato 9999-9999
        return formattedNumber.length > 9 ? formattedNumber.slice(0, 9) : formattedNumber; // Limitar a 9 caracteres
    };
    
    const handleConfirm = () => {
        const newSupplier = {
            id: 0,
            name,
            phone,
            email,
            address,
            entityTypeId: selectedEntityType,
            clientContact,
            idNumber
        };

        fetch('http://localhost:8080/supplier', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSupplier)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setShowSuccessModal(true);
                resetForm(); // Reset form fields
            })
            .catch(error => {
                console.error('Error adding supplier:', error);
                setShowErrorModal(true);
            })
            .finally(() => {
                setShowConfirmationModal(false); // Hide confirmation modal
            });
    };

    const resetForm = () => {
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setClientContact('');
        setIdNumber('');
        setSelectedEntityType(null);
        setIdMask(''); // Reset mask to default
    };
    

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 id="provider-title" className="text-center mb-5">Agregar Proveedor</h1>

                <div className="mb-4">
                    <form onSubmit={handleSubmit}>
                        {/* ID Number with Mask */}
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="idNumber" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-id-card" id="icon-id-number"></i> Cédula
                            </label>
                            <div className="col-sm-8">
                                <InputMask
                                    mask={idMask} // Use dynamic mask
                                    id="idNumber"
                                    className="form-control border-primary"
                                    placeholder="Ingresa la cédula del proveedor"
                                    value={idNumber}
                                    onChange={(e) => setIdNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Entity Type */}
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="entityType" className="col-sm-4 col-form-label form-label">
                            <i className="fas fa-building" id="icon-entity-type"></i> Tipo de Entidad
                            </label>
                            <div className="col-sm-8">
                                <select
                                    id="entityType"
                                    className="form-control border-primary"
                                    value={selectedEntityType || ''}
                                    onChange={handleEntityTypeChange} // Use handler to set entity type and update mask
                                    required
                                >
                                    <option value="">Seleccione un tipo de entidad</option>
                                    {entityTypes.map(entityType => (
                                        <option key={entityType.id} value={entityType.id}>
                                            {entityType.typeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                         {/* Name */}
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="name" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-user" id="icon-provider-name"></i> Nombre
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el nombre del proveedor"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="phone" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-phone" id="icon-provider-phone"></i> Número Telefónico
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="phone"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el número telefónico"
                                    value={formatPhoneNumber(phone)}
                                    onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="email" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-envelope" id="icon-provider-email"></i> Correo Electrónico
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="address" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-map-marker-alt" id="icon-provider-address"></i> Dirección
                            </label>
                            <div className="col-sm-8">
                                <textarea
                                    id="address"
                                    className="form-control border-primary"
                                    placeholder="Ingresa la dirección"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Client Contact */}
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="clientContact" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-user" id="icon-client-contact"></i> Nombre del Contacto
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="clientContact"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el nombre del contacto"
                                    value={clientContact} // No formatting needed for name
                                    onChange={(e) => setClientContact(e.target.value)} // Keep as is for name input
                                    required // Optional: if you want to make this field required
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <Button className="btn btn-lg btn-custom w-100 shadow-sm" type="submit">
                                <i className="fas fa-save"></i> Guardar
                            </Button>
                        </div>
                    </form>

                    {/* Confirmation Modal */}
                    <ConfirmationModal
                        show={showConfirmationModal}
                        onHide={() => setShowConfirmationModal(false)}
                        confirmAction="guardar"
                        onConfirm={handleConfirm}
                    />

                    {/* Success Modal */}
                    <SuccessModal
                        show={showSuccessModal}
                        onHide={() => setShowSuccessModal(false)}
                        title="Operación Exitosa"
                        message="El registro se ha guardado correctamente."
                    />


                    {/* Error Modal */}
                    <ErrorModal
                        show={showErrorModal}
                        onHide={() => setShowErrorModal(false)}
                        title="Error"
                        message="Hubo un problema al guardar el registro. Por favor, intenta nuevamente."
                    />

                </div>
            </div>
        </div>
    );
};

export default AddSupplier;

import { useEffect, useState, useRef } from "react";
import { useUser } from "../../hooks/user/useUser.jsx";
import UserBanner from "./UserBanner.jsx";
import RoleAndStateModal from "../../components/popUp/rolaAndStatesModal/RoleAndStatedModal.jsx";
import SaveButton from "../../components/button/SaveButton.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllUserRoles } from "../../api/user/userRole_API.js";
import { getAllUserStates } from "../../api/user/userState_API.js";
import { saveUser } from "../../api/auth/auth_API.js";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import '../../style/createPage.css'

export default function CreateUser() {

    const [formData, setFormData] = useState({ name: "", email: "", state: "", role: "" });
    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [roles, setRoles] = useState([]);
    const [states, setStates] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    
    const navigate = useNavigate();
    const formRef = useRef(null);

    const clearForm = () => {
        setFormData({name: "", email: "", state: "", role: ""});
    }

    const { data: userRolesData } = useQuery({
        queryKey: ["userRoles"],
        queryFn: getAllUserRoles,
        retry: 2,
        refetchOnWindowFocus: false
    });

    const { data: userStatesData } = useQuery({
        queryKey: ["userStates"],
        queryFn: getAllUserStates,
        retry: 2,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (userRolesData?.data) {
            setRoles(userRolesData.data);
        }
        if (userStatesData?.data) {
            setStates(userStatesData.data);
        }
    }, [userRolesData, userStatesData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const checkErrors = () => {
        const errors = {};

        if (!formData.name) errors.name = "El nombre es obligatorio.";
        if (!formData.email) errors.email = "El correo electrónico es obligatorio.";
        if (!formData.state) errors.state = "Debe seleccionar un estado.";
        if (!formData.role) errors.role = "Debe seleccionar un rol.";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

   

    const handleSubmit = async () => {
        if (!checkErrors()) return;

        setSuccessMessage(""); 
        setFormErrors({}); 

        const userPayload = {
            name: formData.name,
            email: formData.email,
            userRoleId: parseInt(formData.role, 10),
            userStatusId: parseInt(formData.state, 10),
        };

        try {
            const response = await saveUser(userPayload);
            toast.success(response.message, { duration: 7000 });
            navigate("/app/userTable")
            clearForm()
        } catch (error) {
            console.error("Error en la solicitud:", error);
            toast.error(error.message, { duration: 7000 });
        }
        
    };

    return (
        <>
            <UserBanner title="Crear Usuario" visibleButtons={["goBack", "roles"]} handleOpen={() => setOpenModal(true)} />

            <div className="container-fluid p-0">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "100%", borderRadius: "15px" }}>
                    <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
                        <div className="row mb-4">
                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="name" className="form-label">
                                    <i className="fas fa-id-badge"></i> Nombre del usuario <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control border-primary"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ej: Jane Doe"
                                    required
                                />
                                {formErrors.name && <div className="input-text-error show">{formErrors.name}</div>}
                            </div>

                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="email" className="form-label">
                                    <i className="fas fa-envelope"></i> Email <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control border-primary"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Ej: jane.doe@example.com"
                                    required
                                />
                                {formErrors.email && <div className="input-text-error show">{formErrors.email}</div>}
                            </div>

                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="state" className="form-label">
                                    <i className="fas fa-toggle-on"></i> Estado <span className="text-danger">*</span>
                                </label>
                                <select
                                    name="state"
                                    id="state"
                                    className="form-select border-primary"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar estado</option>
                                    {states.map((state) => (
                                        <option key={state.id} value={state.id}>
                                            {state.stateName} - {state.description}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.state && <div className="input-text-error show">{formErrors.state}</div>}
                            </div>

                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="role" className="form-label">
                                    <i className="fas fa-user-tag"></i> Rol <span className="text-danger">*</span>
                                </label>
                                <select
                                    name="role"
                                    id="role"
                                    className="form-select border-primary"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar rol</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.roleName} - {role.description}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.role && <div className="input-text-error show">{formErrors.role}</div>}
                            </div>
                        </div>

                        
                        {formErrors.api && <div className="alert alert-danger">{formErrors.api}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        <div className="d-flex justify-content-end mb-0">
                            <SaveButton acceptAction={handleSubmit} labelAccept="Guardar" />
                        </div>
                    </form>
                </div>
            </div>

            <RoleAndStateModal open={openModal} onClose={() => setOpenModal(false)} roles={roles} states={states} />
        </>
    );
}

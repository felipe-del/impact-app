import { useUser } from "../../hooks/user/useUser.jsx";
import UserBanner from "./UserBanner.jsx";
import RoleAndStateModal from "../../components/popUp/rolaAndStatesModal/RoleAndStatedModal.jsx";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserRoles } from "../../api/userRole_API.js";
import { getAllUserStates } from "../../api/userState_API.js";

export default function CreateUser() {
    const [openModal, setOpenModal] = useState(false);
    const [roles, setRoles] = useState([]);
    const [states, setStates] = useState([]);
    const [formData, setFormData] = useState({ name: "", email: "", state: "", role: "" });

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const userSession = useUser();

    const { data: userRolesData } = useQuery({
        queryKey: ['userRoles'],
        queryFn: getAllUserRoles,
        retry: 2,
        refetchOnWindowFocus: false
    });

    const { data: userStatesData } = useQuery({
        queryKey: ['userStates'],
        queryFn: getAllUserStates,
        retry: 2,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (userRolesData) {
            setRoles(userRolesData.data);
        }
        if (userStatesData) {
            setStates(userStatesData.data);
        }
    }, [userRolesData, userStatesData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Data Submitted:", formData);
        // Aquí puedes hacer la petición para enviar los datos al backend
    };

    return (
        <>
            <UserBanner
                title="Crear Usuario"
                visibleButtons={["goBack", "roles"]}
                handleOpen={handleOpen}
            />

            <form onSubmit={handleSubmit} className="user-form">
                <label>Nombre:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>Correo:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>Estado:
                    <select name="state" value={formData.state} onChange={handleChange} required>
                        <option value="">Seleccione un estado</option>
                        {states.map(state => (
                            <option key={state.id} value={state.id}>{state.name}</option>
                        ))}
                    </select>
                </label>
                <label>Rol:
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Seleccione un rol</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Registrar Usuario</button>
            </form>

            <RoleAndStateModal
                open={openModal}
                onClose={handleClose}
                roles={roles}
                states={states}
            />
        </>
    );
}

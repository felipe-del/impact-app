import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllUsers } from "../../api/User_API.js";
import { Button } from "@mui/material";
import DataTable from "../../components/dataTable/DataTable.jsx";
import AddUser from "./AddUser.jsx";
import { Add } from "@mui/icons-material"; // Usar otro ícono


export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const getUsers = async () => {
        try {
            const response = await getAllUsers();
            toast.success("Usuarios cargados correctamente", { icon: '🚀' });
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const dataWithRolesAndStates = users.map(user => ({
        ...user,
        userRoleResponse: user.userRoleResponse ? user.userRoleResponse.roleName : 'N/A',
        userStateResponse: user.userStateResponse ? user.userStateResponse.stateName : 'N/A',
    }));

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
        toast.success("Usuario eliminado");
    };

    const handleAddUserClick = () => {
        return(
            <AddUser />
        )
    }

    useEffect(() => {
        getUsers();
    }, []);

    const columns = [
        {
            name: "name",
            label: "Nombre",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "userRoleResponse",
            label: "Rol",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "userStateResponse",
            label: "Estado",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];

    return (
        <div>
            <DataTable
                title="Lista de Usuarios"
                data={dataWithRolesAndStates.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))}
                columns={columns}
                options={{
                    rowsPerPage: 7,
                    rowsPerPageOptions: [7, 16, 30],
                    page: 0,
                    filterType: 'checkbox',
                    selectableRows: 'single',
                    customToolbar: () => (
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleAddUserClick} // Llamar a la función para abrir el modal
                        >
                            <Add />
                        </Button>
                    ),
                }}
                handleDeleteRows={handleDelete}
            />
        </div>
    );
}

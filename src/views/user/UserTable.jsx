import { useState, useEffect, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@mui/material';
import { getAllUsers } from "../../api/user_API.js";
import { useQuery } from "@tanstack/react-query";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";

import PropTypes from 'prop-types';
import {getAllUserRoles} from "../../api/userRole_API.js";
import {getAllUserStates} from "../../api/userState_API.js";
import RoleAndStateModal from "../../components/popUp/rolaAndStatesModal/RoleAndStatedModal.jsx";
import './userTable.css'

const UserTable = () => {
    const [openModal, setOpenModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [states, setStates] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [tempState, setTempState] = useState({});

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const { data: usersData, isLoading: isUsersLoading, isError: isUsersError, error: usersError } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
        retry: 2,
        refetchOnWindowFocus: false
    });

    const { data: userRolesData, isLoading: isUserRolesLoading, isError: isUserRolesError, error: userRolesError } = useQuery({
        queryKey: ['userRoles'],
        queryFn: getAllUserRoles,
        retry: 2,
        refetchOnWindowFocus: false
    });

    const { data: userStatesData, isLoading: isUserStatesLoading, isError: isUserStatesError, error: userStatesError } = useQuery({
        queryKey: ['userStates'],
        queryFn: getAllUserStates,
        retry: 2,
        refetchOnWindowFocus: false
    });

    // Update state when data is fetched
    useEffect(() => {
        if (usersData) {
            setUsers(usersData.data);
        }
        if(userRolesData) {
            setRoles(userRolesData.data)
        }
        if(userStatesData) {
            setStates(userStatesData.data)
        }
    }, [usersData, userRolesData]);

    // Start editing a row
    const startEditing = (rowId, currentState) => {
        setEditRowId(rowId);
        setTempState({ ...tempState, [rowId]: currentState });
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditRowId(null);
    };

    // Save changes
    const saveChanges = (rowId) => {
        setUsers(prevData =>
            prevData.map(user =>
                user.id === rowId ? { ...user, userStateResponse: { ...user.userStateResponse, state: tempState[rowId] } } : user
            )
        );
        setEditRowId(null);
    };

    const columns = useMemo(
        () => [
            { accessorKey: 'id', header: 'ID', size: 50 },
            { accessorKey: 'name', header: 'Name', size: 150 },
            { accessorKey: 'email', header: 'Email', size: 200 },
            { accessorKey: 'userRoleResponse.roleName', header: 'Role', size: 150 },
            { accessorKey: 'userStateResponse.stateName', header: 'State', size: 150 },
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 80,
                enableSorting: false,
                enableColumnFilter: false,
                enableHiding: false,
                // enableColumnActions: false,
                Cell: ({ row }) => (
                    editRowId === row.original.id ? (
                        <>
                            <Button onClick={() => saveChanges(row.original.id)} color="success">Aceptar</Button>
                            <Button onClick={cancelEditing} color="error">Cancelar</Button>
                        </>
                    ) : (
                        <Button onClick={() => startEditing(row.original.id, row.original.userStateResponse.state)} color="primary">
                            Editar
                        </Button>
                    )
                ),
            },
        ],
        [editRowId, tempState]
    );

    const table = useMaterialReactTable({
        columns,
        data: users,
        initialState: {
            columnVisibility: { id: false },
            density: 'compact', // Opciones: 'compact', 'standard', 'comfortable'
        }
    });

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableData = users.map(user => [
            user.id,
            user.name,
            user.email,
            user.userRoleResponse.roleName,
            user.userStateResponse.stateName
        ]);

        autoTable(doc, {
            head: [['ID', 'Name', 'Email', 'Role', 'State']],
            body: tableData,
        });

        doc.save('users.pdf');
    };

    const flatUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.userRoleResponse.roleName,
        state: user.userStateResponse.stateName
    }));

    return (
        <div className="mrt-table-container">
            {isUsersLoading && <LoadingPointsSpinner />}
            {isUsersError && <div>Error: {usersError.message}</div>}
            <div className="export-buttons">
                <CSVLink data={flatUsers} filename="users.csv">
                    <Button variant="contained" color="primary" onClick={exportToPDF}>
                        Exportar a CSV
                    </Button>
                </CSVLink>
                <Button variant="contained" color="primary" onClick={exportToPDF}>
                    Exportar a PDF
                </Button>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Mostrar Roles y Estados
                </Button>
            </div>
            <MaterialReactTable table={table} />
            <RoleAndStateModal
                open={openModal}
                onClose={handleClose}
                roles={roles}
                states={states}
            />
        </div>
    );
};

UserTable.propTypes = {
    row: PropTypes.shape({
        original: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            userStateResponse: PropTypes.shape({
                state: PropTypes.string,
            }),
        }),
    }),
};

export default UserTable;

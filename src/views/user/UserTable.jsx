import { useState, useEffect, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { getAllUsers } from "../../api/user_API.js";
import { useQuery } from "@tanstack/react-query";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import PropTypes from 'prop-types';
import { getAllUserRoles } from "../../api/userRole_API.js";
import { getAllUserStates } from "../../api/userState_API.js";
import RoleAndStateModal from "../../components/popUp/rolaAndStatesModal/RoleAndStatedModal.jsx";
import './userTable.css';
import UserBanner from "./UserBanner.jsx";

const UserTable = () => {
    const [openModal, setOpenModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [states, setStates] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [tempState, setTempState] = useState({});
    const [tempRole, setTempRole] = useState({});

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const { data: usersData, isLoading: isUsersLoading, isError: isUsersError, error: usersError } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
        retry: 2,
        refetchOnWindowFocus: false
    });

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
        if (usersData) {
            setUsers(usersData.data);
        }
        if (userRolesData) {
            setRoles(userRolesData.data);
        }
        if (userStatesData) {
            setStates(userStatesData.data);
        }
    }, [usersData, userRolesData, userStatesData]);

    const startEditing = (rowId, currentRole, currentState) => {
        setEditRowId(rowId);
        setTempRole({ ...tempRole, [rowId]: currentRole });
        setTempState({ ...tempState, [rowId]: currentState });
    };

    const cancelEditing = () => {
        setEditRowId(null);
    };

    const saveChanges = (rowId) => {
        setUsers(prevData =>
            prevData.map(user =>
                user.id === rowId
                    ? { ...user, userRoleResponse: { ...user.userRoleResponse, roleName: tempRole[rowId] }, userStateResponse: { ...user.userStateResponse, stateName: tempState[rowId] } }
                    : user
            )
        );
        setEditRowId(null);
    };

    const columns = useMemo(
        () => [
            { accessorKey: 'id', header: 'ID', size: 50 },
            { accessorKey: 'name', header: 'Name', size: 150 },
            { accessorKey: 'email', header: 'Email', size: 200 },
            {
                accessorKey: 'userRoleResponse.roleName',
                header: 'Role',
                size: 150,
                Cell: ({ row }) => (
                    editRowId === row.original.id ? (
                        <FormControl fullWidth sx={{
                            width: '70%',
                            backgroundColor: '#f0f5ff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                backgroundColor: '#e2efff',
                            },
                            fontFamily: 'Montserrat, sans-serif',
                        }}>
                            <InputLabel sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: '#555',
                                fontSize: '14px',
                                fontWeight: '600',
                            }}>
                                Role
                            </InputLabel>
                            <Select
                                value={tempRole[row.original.id] || row.original.userRoleResponse.roleName}
                                onChange={(e) => setTempRole({ ...tempRole, [row.original.id]: e.target.value })}
                                label="Role"
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.roleName} sx={{
                                        '&:hover': {
                                            backgroundColor: '#e2efff', // Hover effect
                                        },
                                        fontFamily: 'Montserrat, sans-serif',
                                    }}>
                                        {role.roleName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        row.original.userRoleResponse.roleName
                    )
                )
            },
            {
                accessorKey: 'userStateResponse.stateName',
                header: 'State',
                size: 150,
                Cell: ({ row }) => (
                    editRowId === row.original.id ? (
                        <FormControl fullWidth sx={{
                            width: '70%',
                            backgroundColor: '#f0f5ff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                backgroundColor: '#e2efff',
                            },
                            fontFamily: 'Montserrat, sans-serif',
                        }}>
                            <InputLabel sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: '#555',
                                fontSize: '14px',
                                fontWeight: '600',
                            }}>
                                State
                            </InputLabel>
                            <Select
                                value={tempState[row.original.id] || row.original.userStateResponse.stateName}
                                onChange={(e) => setTempState({ ...tempState, [row.original.id]: e.target.value })}
                                label="State"
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            >
                                {states.map((state) => (
                                    <MenuItem key={state.id} value={state.stateName} sx={{
                                        '&:hover': {
                                            backgroundColor: '#e2efff', // Hover effect
                                        },
                                        fontFamily: 'Montserrat, sans-serif',
                                    }}>
                                        {state.stateName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    ) : (
                        row.original.userStateResponse.stateName
                    )
                )
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 80,
                enableSorting: false,
                enableColumnFilter: false,
                enableHiding: false,
                Cell: ({ row }) => (
                    editRowId === row.original.id ? (
                        <>
                            <Button onClick={() => saveChanges(row.original.id)} color="success">Aceptar</Button>
                            <Button onClick={cancelEditing} color="error">Cancelar</Button>
                        </>
                    ) : (
                        <Button onClick={() => startEditing(row.original.id, row.original.userRoleResponse.roleName, row.original.userStateResponse.stateName)} color="primary">
                            Editar
                        </Button>
                    )
                ),
            },
        ],
        [editRowId, tempState, tempRole, roles, states]
    );

    const table = useMaterialReactTable({
        columns,
        data: users,
        initialState: {
            columnVisibility: { id: false },
            density: 'comfortable',
            pagination: {
                pageSize: 5,
            },
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
            <UserBanner
                flatUsers={flatUsers}
                exportToPDF={exportToPDF}
                handleOpen={handleOpen}
            />
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

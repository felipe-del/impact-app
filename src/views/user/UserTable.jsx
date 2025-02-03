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
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {changeUserRole, changeUserState} from "../../api/auth_API.js";
import {toast} from "react-hot-toast";
import {useUser} from "../../components/IMPACT.jsx";

const UserTable = () => {
    const [openModal, setOpenModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [states, setStates] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [tempState, setTempState] = useState({});
    const [tempRole, setTempRole] = useState({});
    const userSession = useUser();

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const { data: usersData, refetch,  isLoading: isUsersLoading, isError: isUsersError, error: usersError } = useQuery({
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


    const saveChanges = async (rowId) => {
        if (userSession.id === rowId) {
            toast.error('No puedes cambiar tu propio rol o estado');
            return;
        }
        const roleChanged = tempRole[rowId] !== users.find(user => user.id === rowId).userRoleResponse.roleName;
        const stateChanged = tempState[rowId] !== users.find(user => user.id === rowId).userStateResponse.stateName;

        let serverResponse = {};

        const roleId = roles.find(role => role.roleName === tempRole[rowId])?.id;
        const stateId = states.find(state => state.stateName === tempState[rowId])?.id;

        try {
            if (roleChanged) {
                serverResponse.roleResponse = await changeUserRole(rowId, roleId);
            }

            if (stateChanged) {
                serverResponse.stateResponse = await changeUserState(rowId, stateId);
            }

            setUsers(prevData =>
                prevData.map(user =>
                    user.id === rowId
                        ? {
                            ...user,
                            userRoleResponse: { ...user.userRoleResponse, roleName: tempRole[rowId] },
                            userStateResponse: { ...user.userStateResponse, stateName: tempState[rowId] }
                        }
                        : user
                )
            );

            const successMessage = [
                serverResponse.roleResponse?.message && `Role: ${serverResponse.roleResponse.message}`,
                serverResponse.stateResponse?.message && `Estado: ${serverResponse.stateResponse.message}`
            ].filter(Boolean).join(' ');

            if (successMessage) {
                toast.success(successMessage, { timeout: 6000 });
            }
            setEditRowId(null);
        } catch (error) {
            toast.error(`Failed to save changes. Error: ${error.response?.data?.message || 'Unknown error occurred'}`);
        }
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
                            width: 'auto',
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
                            width: 'auto',
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
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '10px',
                                flexWrap: 'wrap' // Para que los botones se apilen en pantallas pequeñas
                            }}>
                                <IconButton
                                    onClick={() => saveChanges(row.original.id)}
                                    color="success"
                                    style={{
                                        borderRadius: '15px',
                                        padding: '0px',
                                    }}
                                >
                                    <CheckIcon />
                                </IconButton>
                                <IconButton
                                    onClick={cancelEditing}
                                    color="error"
                                    style={{
                                        borderRadius: '15px',
                                        padding: '0px',
                                        marginRight: '20px',
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </>

                    ) : (
                        <IconButton
                            onClick={() => startEditing(
                                row.original.id,
                                row.original.userRoleResponse.roleName,
                                row.original.userStateResponse.stateName
                            )}
                            color="default"
                            variant="contained"
                            style={{
                                borderRadius: '15px',
                                textTransform: 'none',
                                padding: '0px',
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    )
                ),
            },
        ],
        [editRowId, tempState, tempRole, roles, states]
    );

    const table = useMaterialReactTable({
        columns,
        data: users,
        createDisplayMode: 'row',
        initialState: {
            columnVisibility: { id: false },
            density: 'comfortable',
            pagination: {
                pageSize: 5,
            },
        },
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
            userRoleResponse: PropTypes.shape({
                roleName: PropTypes.string,
            }),
            userStateResponse: PropTypes.shape({
                stateName: PropTypes.string,
            }),
        }),
    }),
};

export default UserTable;

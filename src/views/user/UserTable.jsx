import { useState, useEffect, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
} from '@mui/material';
import { getAllUsers } from "../../api/user/user_API.js";
import { useQuery } from "@tanstack/react-query";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import PropTypes from 'prop-types';
import { getAllUserRoles } from "../../api/user/userRole_API.js";
import { getAllUserStates } from "../../api/user/userState_API.js";
import RoleAndStateModal from "../../components/popUp/rolaAndStatesModal/RoleAndStatedModal.jsx";
import '../../style/banner.css';
import UserBanner from "./UserBanner.jsx";
import {changeUserRole, changeUserState} from "../../api/auth/auth_API.js";
import {toast} from "react-hot-toast";
import {useUser} from "../../hooks/user/useUser.jsx";
import EditButton from "../../components/button/EditButton.jsx";
import TableActionButtons from "../../components/button/TableActionButtons.jsx";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import { MRT_Localization_ES } from 'material-react-table/locales/es';

const UserTable = () => {
    const [openRoleAndStateModal, setOpenRoleAndStateModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [states, setStates] = useState([]);

    const handleOpenRoleAndStateModal = () => setOpenRoleAndStateModal(true);
    const handleCloseRoleAndStateModal = () => setOpenRoleAndStateModal(false);

    const userSession = useUser();


    // EDIT LOGIC
    const [editRowId, setEditRowId] = useState(null);
    const [tempState, setTempState] = useState({});
    const [tempRole, setTempRole] = useState({});

    const [confirmationModalBodyText, setConfirmationModalBodyText] = useState('');

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    const handleShowConfirmationModal = () => {
        const user = users.find(user => user.id === editRowId);
        if (!user) return;

        const roleChanged = tempRole[editRowId] !== user.userRoleResponse.roleName;
        const stateChanged = tempState[editRowId] !== user.userStateResponse.stateName;
        const name = user.name;

        if (roleChanged || stateChanged) {
            let changesText = `Al aceptar se guardarán los siguientes cambios para el usuario ${name}:<br>`;

            if (roleChanged) {
                const oldRole = user.userRoleResponse.roleName;
                const newRole = tempRole[editRowId];
                changesText += `Rol: <del>${oldRole}</del> → <strong>${newRole}</strong><br>`;
            }

            if (stateChanged) {
                const oldState = user.userStateResponse.stateName;
                const newState = tempState[editRowId];
                changesText += `Estado: <del>${oldState}</del> → <strong>${newState}</strong><br>`;
            }

            setConfirmationModalBodyText(changesText);
            setShowConfirmationModal(true);
        } else {
            toast.error('No se han realizado cambios');
            cancelEditing();
        }
    };


    const { data: usersData,  isLoading: isUsersLoading, isError: isUsersError, error: usersError } = useQuery({
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
        if (usersData) setUsers(usersData.data);
        if (userRolesData) setRoles(userRolesData.data);
        if (userStatesData) setStates(userStatesData.data);
    }, [usersData, userRolesData, userStatesData]);

    const startEditing = (rowId, currentRole, currentState) => {
        setEditRowId(rowId);
        setTempRole({ ...tempRole, [rowId]: currentRole });
        setTempState({ ...tempState, [rowId]: currentState });
    };

    function handleEdit(row) {
        startEditing(row.original.id, row.original.userRoleResponse.roleName, row.original.userStateResponse.stateName);
    }

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

            if (serverResponse.roleResponse?.message) {
                toast.success(serverResponse.roleResponse.message, { duration: 8000 });
            }

            if (serverResponse.stateResponse?.message) {
                toast.success(serverResponse.stateResponse.message, { duration: 8000 });
            }

            setEditRowId(null);
        } catch (error) {
            toast.error(`Failed to save changes. Error: ${error.response?.data?.message || 'Unknown error occurred'}`);
        }
    };

    const getStateColor = (state) => {
        switch (state.toUpperCase()) {
            case 'ACTIVE':
                return 'green';
            case 'SUSPENDED':
                return 'orange';
            case 'INACTIVE':
                return 'red';
            default:
                return 'inherit';
        }
    };

    const columns = useMemo(
        () => [
            { accessorKey: 'id', header: 'ID'},
            { accessorKey: 'name', header: 'Nombre'},
            { accessorKey: 'email', header: 'Correo'},
            {
                accessorKey: 'userRoleResponse.roleName',
                header: 'Role',
                Cell: ({ row }) => (
                    editRowId === row.original.id ? (
                        <FormControl
                            variant="outlined"
                            sx={{
                                 width: '100%',
                                 minWidth: 120,
                                 '& .MuiInputBase-root': {
                                     backgroundColor: 'white',
                                     borderRadius: '6px',
                                     fontSize: '14px',
                                     fontWeight: '500',
                                     height: '34px',
                                     fontFamily: 'Montserrat, sans-serif',
                                 },
                                 '& .MuiOutlinedInput-notchedOutline': {
                                     border: '1px solid #ccc',
                                 },
                                 '&:hover .MuiOutlinedInput-notchedOutline': {
                                     border: '1px solid #888',
                                 },
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
                header: 'Estado',
                Cell: ({ row }) => (
                    editRowId === row.original.id ? (
                        <FormControl
                            variant="outlined"
                            sx={{
                                width: '100%',
                                minWidth: 120,
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'white',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    height: '34px',
                                    fontFamily: 'Montserrat, sans-serif',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid #ccc',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid #888',
                                },
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
                                        fontFamily: 'Montserrat, sans-serif',
                                    }}>
                                        {state.stateName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    ) : (
                        <Typography
                            sx={{
                                color: getStateColor(row.original.userStateResponse.stateName),
                                fontFamily: 'Montserrat, sans-serif',
                            }}
                        >
                            {row.original.userStateResponse.stateName}
                        </Typography>
                    )
                )
            },
            {
                accessorKey: 'actions',
                header: 'Acciones',
                size: 'small',
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
                                <TableActionButtons confirmationModal={handleShowConfirmationModal} cancelEditing={cancelEditing} row={row} />
                            </div>
                        </>

                    ) : (
                        <EditButton  handleEdit={handleEdit} row={row} />
                    )
                ),
            },
        ],
        [editRowId, tempState, tempRole, roles, states]
    );

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: users,
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

        doc.save('usuarios.pdf');
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
                title="Gestión de Usuarios"
                flatUsers={flatUsers}
                exportToPDF={exportToPDF}
                handleOpen={handleOpenRoleAndStateModal}
            />
            <MaterialReactTable table={table} />
            <RoleAndStateModal
                open={openRoleAndStateModal}
                onClose={handleCloseRoleAndStateModal}
                roles={roles}
                states={states}
            />
            <GenericModal
                show={showConfirmationModal}
                onHide={handleHideConfirmationModal}
                title="¿Desea guardar cambios?"
                bodyText={confirmationModalBodyText}
                onButtonClick={() => saveChanges(editRowId)}
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

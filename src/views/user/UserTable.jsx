import { useState, useEffect, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@mui/material';
import {getAllUsers} from "../../api/User_API.js";
import {useQuery} from "@tanstack/react-query";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [tempState, setTempState] = useState({});

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
        retry: 2,
        refetchOnWindowFocus: false
    });


    useEffect(() => {
        if (data) {
            setUsers(data.data);
        }

    }, [data]);





    // Función para iniciar edición
    const startEditing = (rowId, currentState) => {
        setEditRowId(rowId);
        setTempState({ ...tempState, [rowId]: currentState });
    };

    // Función para cancelar la edición
    const cancelEditing = () => {
        setEditRowId(null);
    };

    // Función para guardar cambios
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
            {isLoading && <LoadingPointsSpinner/>}
            <div className="export-buttons">
                <CSVLink data={flatUsers} filename="users.csv">
                    <button>Export to CSV</button>
                </CSVLink>
                <button onClick={exportToPDF}>Export to PDF</button>
            </div>
            <MaterialReactTable table={table} />
        </div>
    );
};

export default UserTable;
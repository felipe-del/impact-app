
import MUIDataTable from 'mui-datatables';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import './dataTable.css';

const DataTable = ({ title, columns, data, customToolbar, options, handleDeleteRows }) => {
    const defaultOptions = {
        filterType: 'checkbox',
        rowsPerPageOptions: [7, 14, 20],
        rowsPerPage: 7,
        selectableRows: 'multiple',
        search: true,
        searchOpen: false,
        filter: true,
        fixedHeader: true,
        elevation: 4,
        textLabels: {
            body: {
                noMatch: "No se encontraron registros coincidentes. Intenta ajustar tu búsqueda o filtros.",
                toolTip: "Ordenar",
            },
            pagination: {
                next: "Página siguiente",
                previous: "Página anterior",
                rowsPerPage: "Filas por página",
                displayRows: "de",
            },
            toolbar: {
                search: "Buscar registros",
                downloadCsv: "Descargar CSV",
                print: "Imprimir",
                viewColumns: "Ver columnas",
                filterTable: "Filtrar tabla",
            },
            filter: {
                all: "Todos",
                title: "FILTROS",
                reset: "REINICIAR",
            },
            viewColumns: {
                title: "Mostrar columnas",
                titleAria: "Mostrar/ocultar columnas de la tabla",
            },
            selectedRows: {
                text: "fila(s) seleccionada(s)",
                delete: "Eliminar",
                deleteAria: "Eliminar filas seleccionadas",
            },
        },
        customToolbar: customToolbar || (() => (
            <IconButton color="primary" onClick={() => alert('Agregar nuevo ítem')}>
                <AddIcon />
            </IconButton>
        )),
        onRowsDelete: handleDeleteRows,
        onTableChange: (action, tableState) => {
            if (action === 'changePage') {
                console.log(`Página cambiada a: ${tableState.page}`);
            }
        },
        grouping: {
            enabled: false,
        },
    };

    return (
        <MUIDataTable
            title={title}
            data={data}
            columns={columns}
            options={{ ...defaultOptions, ...options }}
        />
    );
};
import PropTypes from 'prop-types';

DataTable.propTypes = {
    title: PropTypes.node.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    customToolbar: PropTypes.func,
    options: PropTypes.object,
    handleDeleteRows: PropTypes.func,
};

export default DataTable;


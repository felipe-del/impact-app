import React from 'react';
import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';
import { FileDownload, PictureAsPdf, AssignmentInd } from '@mui/icons-material';
import * as PropTypes from "prop-types"; // Importando íconos

class UserBanner extends React.Component {
    render() {
        let {flatUsers, exportToPDF, handleOpen} = this.props;
        return (
            <div className="export-buttons" style={styles.banner}>
                <h3 style={styles.title}>Gestión Usuarios</h3> {/* Título a la izquierda */}
                <div style={styles.buttonsContainer}>
                    <CSVLink data={flatUsers} filename="users.csv">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<FileDownload/>} // Icono de descarga
                            style={styles.button}
                        >
                            Exportar a CSV
                        </Button>
                    </CSVLink>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={exportToPDF}
                        startIcon={<PictureAsPdf/>} // Icono de PDF
                        style={styles.button}
                    >
                        Exportar a PDF
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen}
                        startIcon={<AssignmentInd/>} // Icono de roles
                        style={styles.button}
                    >
                        Mostrar Roles y Estados
                    </Button>
                </div>
            </div>
        );
    }
}

UserBanner.propTypes = {
    flatUsers: PropTypes.any,
    exportToPDF: PropTypes.any,
    handleOpen: PropTypes.any
}

const styles = {
    banner: {
        display: 'flex',
        justifyContent: 'space-between', // Distribuir el contenido entre el título y los botones
        padding: '20px 20px',
        marginBottom: '25px',
        backgroundColor: 'white',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    title: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '20px',
        margin: 0, // Para evitar márgenes adicionales
        color: '#333', // Color del título
    },
    buttonsContainer: {
        display: 'flex', // Para colocar los botones en línea
        justifyContent: 'flex-end', // Alinea los botones a la derecha
        gap: '20px', // Espacio entre botones
    },
    button: {
        fontFamily: 'Montserrat, sans-serif',
        textTransform: 'none'
    },
};

export default UserBanner;

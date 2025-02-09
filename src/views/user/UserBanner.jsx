import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { FileDownload, PictureAsPdf, AssignmentInd, ArrowBack, PersonAdd } from "@mui/icons-material";
import * as PropTypes from "prop-types";
import {CSVLink} from "react-csv";

class UserBanner extends React.Component {
    state = {
        anchorEl: null, // Estado para el menú
    };

    // Abre el menú
    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    // Cierra el menú
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { title, flatUsers, exportToPDF, handleOpen, visibleButtons } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className="export-buttons" style={styles.banner}>
                <h3 style={styles.title}>{title}</h3>
                <div style={styles.buttonsContainer}>
                    {visibleButtons.includes("goBack") && (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => window.history.back()}
                            startIcon={<ArrowBack />}
                            style={styles.button}
                        >
                            Volver
                        </Button>
                    )}
                    {visibleButtons.includes("createUser") && (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => window.history.back()}
                            startIcon={<PersonAdd />}
                            style={styles.button}
                        >
                            Crear Usuario
                        </Button>
                    )}

                    {visibleButtons.includes("roles") && (
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={handleOpen}
                            startIcon={<AssignmentInd />}
                            style={styles.button}
                        >
                            Mostrar Roles y Estados
                        </Button>
                    )}

                    {visibleButtons.includes("export") && (
                        <Button
                            variant="contained"
                            color="info"
                            onClick={this.handleClick} // Abre el menú
                            startIcon={<FileDownload />}
                            style={styles.button}
                        >
                            Exportar
                        </Button>
                    )}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        {visibleButtons.includes("csv") && (
                            // delete underline from CSVLink
                            <CSVLink data={flatUsers} filename="users.csv" style={{textDecoration: "none", color: "black"}}>
                                <MenuItem onClick={this.handleClose}>Exportar a CSV</MenuItem>
                            </CSVLink>
                        )}
                        {visibleButtons.includes("pdf") && (
                            <MenuItem onClick={() => { exportToPDF(); this.handleClose(); }} style={{color: "black"}}>
                                Exportar a PDF
                            </MenuItem>
                        )}

                    </Menu>
                </div>
            </div>
        );
    }
}

UserBanner.propTypes = {
    title: PropTypes.string,
    flatUsers: PropTypes.any,
    exportToPDF: PropTypes.func,
    handleOpen: PropTypes.func,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
};

UserBanner.defaultProps = {
    visibleButtons: ["csv", "pdf", "roles", "createUser", "export"], // Todos visibles por defecto
};

const styles = {
    banner: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 15px",
        marginBottom: "20px",
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        borderRadius: "15px",
        top: 0,
        zIndex: 100,
    },
    title: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "20px",
        margin: 5,
        color: "#333",
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "15px",
    },
    button: {
        fontFamily: "Montserrat, sans-serif",
        borderRadius: "15px",
        textTransform: "none",
        fontSize: "12px",
    },
};

export default UserBanner;

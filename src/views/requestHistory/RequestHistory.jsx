import { useState } from "react";
import RequestHistoryBanner from "./RequestHistoryBanner.jsx";

const RequestHistory = () => {
    const [activeButton, setActiveButton] = useState(null);
    const [activeAdditionalButton, setActiveAdditionalButton] = useState(null);
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);

    const handleButtonClick = (buttonKey) => {
        setActiveButton(buttonKey);
        setShowAdditionalButtons(
            buttonKey === "spaceRequest" || buttonKey === "productRequest" || buttonKey === "assetRequest"
        );
    };

    const handleAdditionalButtonClick = (buttonKey) => {
        setActiveAdditionalButton(buttonKey);
    };

    // Recolectar filtros activos
    const activeFilters = [];
    if (activeButton) activeFilters.push(activeButton);
    if (activeAdditionalButton) activeFilters.push(activeAdditionalButton);

    return (
        <>
            <RequestHistoryBanner
                title={"Historial de Solicitudes"}
                activeFilters={activeFilters}
                handleButtonClick={handleButtonClick}
                handleAdditionalButtonClick={handleAdditionalButtonClick}
                activeButton={activeButton}
                activeAdditionalButton={activeAdditionalButton}
                showAdditionalButtons={showAdditionalButtons}
            />

            {/* Mostrar filtros activos en el componente RequestHistory */}
            {activeFilters.length > 0 && (
                <div style={{
                    marginTop: "20px",
                    padding: "15px",
                    backgroundColor: "#f8f9fa", // Fondo claro
                    borderRadius: "8px", // Bordes redondeados
                    border: "1px solid #e9ecef", // Borde sutil
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Sombra suave
                    display: "flex", // Contenedor flexible para disposición horizontal
                    alignItems: "center", // Alinear elementos verticalmente al centro
                    gap: "20px", // Espacio entre el título y los filtros
                }}>
                    {/* Título a la derecha */}
                    <p style={{
                        margin: "0", // Eliminar margen inferior
                        fontSize: "16px",
                        fontWeight: "600", // Semi-bold
                        color: "#495057", // Color de texto oscuro
                        whiteSpace: "nowrap", // Evitar que el título se divida en varias líneas
                    }}>
                        🎯 Filtros activos:
                    </p>

                    {/* Filtros activos */}
                    <div style={{
                        display: "flex", // Contenedor flexible para disposición horizontal
                        flexWrap: "wrap", // Permite que los elementos se envuelvan si no caben
                        gap: "10px", // Espacio entre elementos
                        paddingLeft: "0", // Elimina el margen a la izquierda
                        marginLeft: "0", // Elimina el margen a la izquierda
                    }}>
                        {activeFilters.map((filter, index) => (
                            <div key={index} style={{
                                padding: "8px 12px",
                                backgroundColor: "#ffffff", // Fondo blanco
                                borderRadius: "6px",
                                border: "1px solid #dee2e6", // Borde sutil
                                display: "flex",
                                alignItems: "center",
                                gap: "8px", // Espacio entre ícono y texto
                                fontSize: "14px",
                                color: "#343a40", // Color de texto
                            }}>
                                <span style={{ color: "#6c757d" }}>✔️</span> {filter}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default RequestHistory;
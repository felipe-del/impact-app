import { useState } from "react";
import RequestHistoryBanner from "../../views/requestHistory/RequestHistoryBanner.jsx";

const RequestHistory = () => {
    const [activeButton, setActiveButton] = useState(null);
    const [activeAdditionalButton, setActiveAdditionalButton] = useState(null); // Manage additional button state

    // Function to determine the display text based on active buttons
    const getDisplayText = () => {
        let baseText = "Historial de Solicitudes";

        // Check for active button
        switch (activeButton) {
            case "assetRequest":
                baseText += " para Activos";
                break;
            case "spaceRequest":
                baseText += " para Espacios";
                break;
            case "productRequest":
                baseText += " para Productos";
                break;
            default:
                break;
        }

        // Append status if an additional button is active
        if (activeAdditionalButton) {
            baseText += ` - ${activeAdditionalButton.charAt(0).toUpperCase() + activeAdditionalButton.slice(1)}`;
        }

        return baseText;
    };

    return (
        <>
            <RequestHistoryBanner
                title={getDisplayText()}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                activeAdditionalButton={activeAdditionalButton}
                setActiveAdditionalButton={setActiveAdditionalButton}
            />
        </>
    );
};

export default RequestHistory;

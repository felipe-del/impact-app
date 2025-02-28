
import PropTypes from "prop-types";
import { useState } from "react";

import { bannerStyle } from "../../style/codeStyle.js";
import BannerToggleButton from "../../components/button/BannerToggleButton.jsx";

const RequestHistoryBanner = ({ title = "" }) => {

    const [activeButton, setActiveButton] = useState(null);
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
    const [activeAdditionalButton, setActiveAdditionalButton] = useState(null); // State for additional buttons
    const styles = bannerStyle;

    const handleButtonClick = (buttonKey, path) => {
        setActiveButton(buttonKey);
        setShowAdditionalButtons(
            buttonKey === "spaceRequest" || buttonKey === "productRequest" || buttonKey === "assetRequest"
        );

    };

    const handleAdditionalButtonClick = (buttonKey) => {
        setActiveAdditionalButton(buttonKey); // Set active button for additional buttons
    };

    return (
        <div className="export-buttons" style={styles.banner}>
            <h3 style={styles.title}>{title}</h3>
            {/*<div style={styles.buttonsContainer}>
                <BannerToggleButton
                    onClick={() => handleButtonClick("assetRequest", "/app/assetTable")}
                    text="Activos"
                    icon={<i className="fa-solid fa-desktop"></i>}
                    color={activeButton === "assetRequest" ? "secondary" : "darkPrimary"}
                    style={styles.button}
                    widthWhenIsHover="110px"
                />
                <BannerToggleButton
                    onClick={() => handleButtonClick("spaceRequest", "/app/spaceManagement")}
                    text="Espacios"
                    icon={<i className="fa-solid fa-buildingLocation"></i>}
                    color={activeButton === "spaceRequest" ? "secondary" : "darkPrimary"}
                    style={styles.button}
                    widthWhenIsHover="110px"
                />
                <BannerToggleButton
                    onClick={() => handleButtonClick("productRequest", "/app/productManagement")}
                    text="Productos"
                    icon={<i className="fa-solid fa-box"></i>}
                    color={activeButton === "productRequest" ? "secondary" : "darkPrimary"}
                    style={styles.button}
                    widthWhenIsHover="110px"
                />

                {showAdditionalButtons && (
                    <div style={{
                        margin: "0 10px", // Adjust horizontal spacing
                        width: "2px", // Width of the vertical line
                        height: "40px", // Height of the vertical line
                        backgroundColor: "#ccc", // Choose a light gray color
                        display: "inline-block", // Ensure it displays inline with buttons
                    }} />
                )}

                {showAdditionalButtons && (
                    <div style={styles.buttonsContainer}>
                        <BannerToggleButton
                            onClick={() => handleAdditionalButtonClick("earring")}
                            text="Pendientes"
                            icon={<i className="fa-solid fa-hourglass-half"></i>}
                            color={activeAdditionalButton === "earring" ? "warning" : "darkPrimary"}
                            style={styles.button}
                            widthWhenIsHover="110px"
                        />
                        <BannerToggleButton
                            onClick={() => handleAdditionalButtonClick("active")}
                            text="Activas"
                            icon={<i className="fa-solid fa-toggle-on"></i>}
                            color={activeAdditionalButton === "active" ? "warning" : "darkPrimary"}
                            style={styles.button}
                            widthWhenIsHover="110px"
                        />
                        <BannerToggleButton
                            onClick={() => handleAdditionalButtonClick("inactive")}
                            text="Inactivas"
                            icon={<i className="fa-solid fa-toggle-off"></i>}
                            color={activeAdditionalButton === "inactive" ? "warning" : "darkPrimary"}
                            style={styles.button}
                            widthWhenIsHover="110px"
                        />
                    </div>
                )}
            </div>*/}
        </div>
    );
};

RequestHistoryBanner.propTypes = {
    title: PropTypes.string,
};

export default RequestHistoryBanner;

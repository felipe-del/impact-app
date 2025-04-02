import PropTypes from "prop-types";
import { bannerStyle } from "../../../style/codeStyle.js";
import BannerToggleButton from "../../../components/button/BannerToggleButton.jsx";

const MyRequestsBanner = ({
                                  title = "",
                                  activeFilters = [],
                                  handleButtonClick,
                                  handleAdditionalButtonClick,
                                  activeButton,
                                  activeAdditionalButton,
                                  showAdditionalButtons,
                              }) => {
    const styles = bannerStyle;

    return (
        <div className="export-buttons" style={styles.banner}>
            <h3 style={styles.title}>{title}</h3>
            <div style={styles.buttonsContainer}>
                {/* Botones principales */}
                <BannerToggleButton
                    onClick={() => handleButtonClick("assetRequest")}
                    text="Activos"
                    icon={<i className="fa-solid fa-desktop"></i>}
                    color={activeButton === "assetRequest" ? "secondary" : "darkPrimary"}
                    style={styles.button}
                    widthWhenIsHover="110px"
                />
                <BannerToggleButton
                    onClick={() => handleButtonClick("spaceRequest")}
                    text="Espacios"
                    icon={<i className="fa-solid fa-building"></i>}
                    color={activeButton === "spaceRequest" ? "secondary" : "darkPrimary"}
                    style={styles.button}
                    widthWhenIsHover="110px"
                />
                <BannerToggleButton
                    onClick={() => handleButtonClick("productRequest")}
                    text="Productos"
                    icon={<i className="fa-solid fa-box"></i>}
                    color={activeButton === "productRequest" ? "secondary" : "darkPrimary"}
                    style={styles.button}
                    widthWhenIsHover="110px"
                />

                {/* Separador vertical si hay botones adicionales */}
                {showAdditionalButtons && (
                    <div style={{
                        margin: "0 10px",
                        width: "2px",
                        height: "40px",
                        backgroundColor: "#ccc",
                        display: "inline-block",
                    }} />
                )}

                {/* Botones adicionales */}
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
            </div>
            
        </div>
    );
};

MyRequestsBanner.propTypes = {
    title: PropTypes.string,
    activeFilters: PropTypes.array,
    handleButtonClick: PropTypes.func,
    handleAdditionalButtonClick: PropTypes.func,
    activeButton: PropTypes.string,
    activeAdditionalButton: PropTypes.string,
    showAdditionalButtons: PropTypes.bool,
};

export default MyRequestsBanner;
/**
 * RequestManagementBanner Component
 * 
 * This component is used to display a banner for the Request Management page.
 * It includes a title and action buttons for navigation and information.
 * It uses Material-UI for styling and icons.
 * It also includes a modal for displaying general information.
 */
import PropTypes from "prop-types";
import { bannerStyle } from "../../../style/codeStyle.js";
import BannerActionButton from "../../../components/button/BannerActionButton.jsx";
import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GenericInformationModal from "../../../components/popUp/GenericInformationModal/GenericInformationModal.jsx";

/**
 * RequestManagementBanner component that displays a banner for the Request Management page.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array} visibleButtons - The buttons to display on the banner.
 * * @returns {JSX.Element} - The RequestManagementBanner component.
 */
const RequestManagementBanner = ({
                                     title = "",
                                     visibleButtons = ["goBack", "info"],
                                 }) => {
    const styles = bannerStyle;
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="export-buttons" style={styles.banner}>
            <h3 style={styles.title}>{title}</h3>
            <div style={styles.buttonsContainer}>
                {visibleButtons.includes("goBack") && (
                    <BannerActionButton
                        onClick={() => navigate(-1)}
                        text={"Volver"}
                        icon={<ArrowBack />}
                        color={"error"}
                        style={styles.button}
                    />
                )}

                {visibleButtons.includes("info") && (
                    <BannerActionButton
                        onClick={handleOpenModal}
                        text={"Información"}
                        icon={<InfoOutlined />}
                        color={"primary"}
                        style={styles.button}
                    />
                )}
            </div>

            {/* Modal de información */}
            <GenericInformationModal
                open={isModalOpen}
                onClose={handleCloseModal}
                title="Información general"
                description="Interfaz diseñada para que Administradores y Gestores gestionen eficazmente las solicitudes de Activos, Productos y Espacios que se encuentran en estado pendiente."
            />
        </div>
    );
};

RequestManagementBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
};

export default RequestManagementBanner;

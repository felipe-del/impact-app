import PropTypes from "prop-types";
import { bannerStyle } from "../../../style/codeStyle.js";
import BannerActionButton from "../../../components/button/BannerActionButton.jsx";
import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GenericInformationModal from "../../../components/popUp/GenericInformationModal/GenericInformationModal.jsx";

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
                description="Permite a los administradores o gestores visualizar y gestionar las solicitudes de recursos del sistema. Desde esta sección se puede acceder a los detalles de cada solicitud y realizar acciones como aprobar, denegar o dar seguimiento según el tipo y estado de la misma."
            />
        </div>
    );
};

RequestManagementBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
};

export default RequestManagementBanner;

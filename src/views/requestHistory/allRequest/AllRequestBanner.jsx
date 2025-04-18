import PropTypes from "prop-types";
import { bannerStyle } from "../../../style/codeStyle.js";
import BannerActionButton from "../../../components/button/BannerActionButton.jsx";
import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GenericInformationModal from "../../../components/popUp/GenericInformationModal/GenericInformationModal.jsx";

const AllRequestBanner = ({
                              title = "",
                              visibleButtons = ["goBack"],
                          }) => {
    const styles = bannerStyle;
    const navigate = useNavigate();

    // Estado para manejar el modal
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
                description="Representa una tabla unificada que muestra todas las solicitudes de recursos del sistema, excluyendo las que están pendientes o son renovaciones. Agrupa visualmente diferentes tipos de solicitudes (activos, productos y espacios) y presenta información clave como el tipo de solicitud, el usuario, el motivo, el recurso solicitado, la fecha y el estado actual."
                />
        </div>
    );
};

AllRequestBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
};

export default AllRequestBanner;

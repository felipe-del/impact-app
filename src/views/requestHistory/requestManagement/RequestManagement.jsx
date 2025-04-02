import RequestManagementBanner from "./RequestManagementBanner.jsx";

const RequestManagement = () => {
    return (
        <>
            <RequestManagementBanner title={"Solicitudes pendientes por gestionar"} visibleButtons={["goBack"]}/>
            <div><h1>ESTA PAGINA ES PARA QUE LOS ADMINS O MANAGERS VEAN TODAS LAS SOLICITUDES PENDIENTES Y PUEDAN ACEPTARLOS O DENEGARLAS</h1></div>
        </>
    )
}

export default RequestManagement;
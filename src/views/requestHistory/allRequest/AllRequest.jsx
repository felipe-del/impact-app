import AllRequestBanner from "./AllRequestBanner.jsx";

const AllRequest = () => {
    return (
        <>
            <AllRequestBanner title={"Todas las solicitudes"} visibleButtons={["goBack"]}/>
            <div> <h1>ESTA PAGINA ES PARA QUE LOS ADMINS O MANAGERS VEAN TODAS LAS SOLICITUDES (NO PENDIENTES)</h1> </div>
        </>
    )
}

export default AllRequest;
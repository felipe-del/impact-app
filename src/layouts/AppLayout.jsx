import { useQuery } from "@tanstack/react-query";
import {Navigate, Outlet} from "react-router-dom";
import {getUser} from "../api/Auth_API.js";
import IMPACT from "../components/IMPACT.jsx";

export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 2,
        refetchOnWindowFocus: false
    })
    if(isLoading) return <p>Cargando...</p>
    if(isError) return <Navigate to={'/auth'} />
    if (data) return <IMPACT responseWrapper={data}><Outlet/></IMPACT>
}
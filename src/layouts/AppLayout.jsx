import { useQuery } from "@tanstack/react-query";
import {Navigate, Outlet} from "react-router-dom";
import {getUserSession} from "../api/auth/auth_API.js";
import IMPACT from "../components/IMPACT.jsx";

import LoadingSpinner from "../components/spinner/loadingSpinner/LoadingSpinner.jsx";

export default function AppLayout() {

    const { data, isLoading, isError} = useQuery({
        queryFn: getUserSession,
        queryKey: ['user'],
        retry: 2,
        refetchOnWindowFocus: false,
    })
    if(isLoading) return <LoadingSpinner />
    if(isError) {
        if(localStorage.getItem('AUTH_TOKEN')) localStorage.removeItem('AUTH_TOKEN')
        return <Navigate to={'/auth'} />
    }
    if (data) return (
        <IMPACT responseWrapper={data}>
            <Outlet />
        </IMPACT>
    );

}
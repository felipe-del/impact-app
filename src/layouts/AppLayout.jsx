import { useQuery } from "@tanstack/react-query";
import {Navigate, Outlet} from "react-router-dom";
import {getUser} from "../api/auth_API.js";
import IMPACT from "../components/IMPACT.jsx";

import LoadingSpinner from "../components/spinner/loadingSpinner/LoadingSpinner.jsx";

export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 2,
        refetchOnWindowFocus: false
    })
    if(isLoading) return <LoadingSpinner />
    if(isError) return <Navigate to={'/auth'} />
    if (data) return (
        <>
            <IMPACT responseWrapper={data}>
                <Outlet />
            </IMPACT>
        </>
    );

}
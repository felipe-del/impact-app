/**
 * AppLayout component
 * 
 * This file contains the AppLayout component that serves as the main layout for the application.
 * It uses React Router to define the layout and handles user authentication.
 * It uses the useQuery hook from React Query to fetch user session data and manage loading and error states.
 * It also uses the IMPACT component to wrap the main content of the application.
 */
import { useQuery } from "@tanstack/react-query";
import {Navigate, Outlet} from "react-router-dom";
import {getUserSession} from "../api/auth/auth_API.js";
import IMPACT from "../components/IMPACT.jsx";
import LoadingSpinner from "../components/spinner/loadingSpinner/LoadingSpinner.jsx";

/**
 * AppLayout component
 * 
 * This component serves as the main layout for the application.
 * It fetches user session data and handles loading and error states.
 * If the user is authenticated, it renders the main content of the application.
 * Otherwise, it redirects to the authentication page.
 * 
 * @component
 * @returns {JSX.Element} - The main layout of the application or a redirect to the authentication page.
 */
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
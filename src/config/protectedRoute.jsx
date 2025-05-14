/**
 * ProtectedRoute component
 * 
 * This component is used to protect routes in a React application.
 * It checks if the user is authenticated and has the required role to access the route.
 * If the user is not authenticated, they are redirected to the login page.
 * If the user does not have the required role, they are redirected to an unauthorized page.
 */
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
import {useUser} from "../hooks/user/useUser.jsx";

/**
 * ProtectedRoute component that checks user authentication and role authorization.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {Array<string>} props.allowedRoles - Array of allowed roles for the route.
 * @returns {JSX.Element} The rendered ProtectedRoute component or a redirect.
 */
const ProtectedRoute = ({ allowedRoles }) => {

    const user = useUser();

    const navigate = useNavigate();

    if (!user) navigate('/auth');

    if (!allowedRoles.includes(user.userRoleResponse.roleName)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;

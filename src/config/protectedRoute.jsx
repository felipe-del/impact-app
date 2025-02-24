import {Navigate, Outlet, useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
import {useUser} from "../hooks/user/useUser.jsx";


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

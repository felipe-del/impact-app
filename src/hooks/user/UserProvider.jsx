import { createContext } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext(null);

export const UserProvider = ({ children, user }) => {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.any.isRequired,
};

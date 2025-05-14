/**
 * UserProvider.jsx
 * 
 * This file contains a context provider for user data in a React application.
 * It uses the React Context API to provide user data to components in the application.
 * It allows components to access user data without having to pass it down through props.
 */
import { createContext } from "react";
import PropTypes from "prop-types";

/**
 * UserContext
 * 
 * This context is used to provide user data to components in the application.
 * It allows components to access user data without having to pass it down through props.
 */
export const UserContext = createContext(null);

/**
 * UserProvider component
 * 
 * This component provides the UserContext to its children.
 * It takes user data as a prop and makes it available to all components within the provider.
 * 
 * @component
 * @param {object} props - The props object.
 * @param {ReactNode} props.children - The child components that will have access to the UserContext.
 * @param {any} props.user - The user data to be provided to the context.
 * @returns {JSX.Element} - The UserProvider component.
 */
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

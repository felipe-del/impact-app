/**
 * useUser.jsx
 * 
 * This file contains a custom hook that provides access to user data in a React application.
 * It uses the React Context API to access user data from the UserContext.
 * It allows components to access user data without having to pass it down through props.
 */
import { useContext } from "react";
import { UserContext } from "./UserProvider";

/**
 * useUser hook
 * 
 * This hook provides access to user data from the UserContext.
 * It throws an error if used outside of a UserProvider.
 * 
 * @component
 * @returns {any} - The user data from the UserContext.
 * @throws {Error} - Throws an error if used outside of a UserProvider.
 */
export const useUser = () => {
    const user = useContext(UserContext);
    if (user === null) {
        throw new Error("useUser debe ser usado dentro de un UserProvider");
    }
    return user;
};

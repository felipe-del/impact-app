import { useContext } from "react";
import { UserContext } from "./UserProvider";

export const useUser = () => {
    const user = useContext(UserContext);
    if (user === null) {
        throw new Error("useUser debe ser usado dentro de un UserProvider");
    }
    return user;
};

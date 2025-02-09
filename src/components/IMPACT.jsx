import { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "./sidebar/Sidebar.jsx";
import TopBar from "./topBar/TopBar.jsx";
import {UserProvider} from "../hooks/user/UserProvider.jsx";

export default function IMPACT({ responseWrapper, children }) {
    const [user] = useState(responseWrapper.data);  // Suponemos que el `responseWrapper.data` es el usuario

    return (
        <UserProvider user={user}>
            <div id="wrapper">
                {/* Sidebar */}
                <Sidebar role={user?.userRoleResponse?.roleName || "Default Role"} />
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* TopBar */}
                        <TopBar user={user || { userName: "Default User" }} />
                        {/* Page Content */}
                        <div className="container-fluid">
                            <h1 className="h3 mb-4 text-gray-800">
                                {children || <h1 className="h3 mb-4 text-gray-800">IMPACT</h1>}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </UserProvider>
    );
}

IMPACT.propTypes = {
    responseWrapper: PropTypes.any.isRequired,
    children: PropTypes.node,
};

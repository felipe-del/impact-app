/**
 * IMPACT Component
 * 
 * This component serves as the main layout for the application.
 * It includes a sidebar, top navigation bar, and a content area.
 * It uses the UserProvider to manage user state and context.
 * The component is designed to be responsive and adapts to different screen sizes.
 */
import { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "./sidebar/Sidebar.jsx";
import TopBar from "./topBar/TopBar.jsx";
import {UserProvider} from "../hooks/user/UserProvider.jsx";

/**
 * IMPACT React component.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.responseWrapper - The response wrapper containing user data.
 * @param {ReactNode} props.children - Optional children to render inside the component.
 * @returns {JSX.Element} The rendered IMPACT component.
 */
export default function IMPACT({ responseWrapper, children }) {
    const [user] = useState(responseWrapper.data);

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
                            <div className="h3 mb-4 text-gray-800">
                                {children || <h1 className="h3 mb-4 text-gray-800">IMPACT</h1>}
                            </div>
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

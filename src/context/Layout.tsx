import React from 'react';
import Sidebar from "../components/sidebar/Sidebar.tsx";
import TopBar from "../components/topbar/TopBar.tsx";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div id="wrapper">
            {/* Sidebar */}
            <Sidebar />

            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
                {/* Main Content */}
                <div id="content">
                    {/* TopBar */}
                    <TopBar />

                    {/* Page Content */}
                    <div className="container-fluid">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;

import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import TopBar from '../components/topBar/topBar';


const LayoutContext = ({ children }) => {
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

export default LayoutContext;

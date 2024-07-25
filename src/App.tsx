import React from 'react';
import {Outlet} from "react-router-dom";
import Layout from "./context/Layout.tsx";


const App: React.FC = () => {
    return (
        <div>
            <Layout>
                <Outlet/>
            </Layout>
        </div>
    );
};

export default App;

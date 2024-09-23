import React from 'react';
import {Outlet} from "react-router-dom";
import LayoutContext from './context/layoutContext';
import { PageProvider } from './context/pageContext';


const App = () => {
    return (
        <>
          <PageProvider>
            <LayoutContext>
                <Outlet />
            </LayoutContext>
          </PageProvider>
        </>
    );
};

export default App;

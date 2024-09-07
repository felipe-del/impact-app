import React from 'react';
import {Outlet} from "react-router-dom";
import LayoutContext from './context/layoutContext';


const App = () => {
    return (
        <>
          <LayoutContext>
            <Outlet/>
          </LayoutContext>
        </>
    );
};

export default App;

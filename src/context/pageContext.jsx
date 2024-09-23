// PageContext.jsx
import React, { createContext, useContext, useState } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
    const [pageName, setPageName] = useState("Default Page");

    return (
        <PageContext.Provider value={{ pageName, setPageName }}>
            {children}
        </PageContext.Provider>
    );
};

export const usePage = () => {
    return useContext(PageContext);
};

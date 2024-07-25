import { createBrowserRouter } from 'react-router-dom';
import App from "../App.tsx";
import Authentication from "../pages/Authentication.tsx";
import Dashboard from "../pages/Dashboard.tsx";


export const Routes = createBrowserRouter([
    {
        path: '/app',
        element: <App/>,
        children: [
            {
                path: 'home',
                element: <Dashboard/>
            }
        ]
    },
    {
        path: '/',
        element: <Authentication/>,
        children: [

        ]
    }
]);

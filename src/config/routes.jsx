import { createBrowserRouter } from 'react-router-dom';
import About from '../pages/about/about.jsx';
import App from '../App.jsx';

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <About/>,
    },
    {
        path: '/app',
        element: <App/>,
        children: [
            {
                path: 'about',
                element: <About/>
            },
        ]
    }
]);

import { createBrowserRouter } from 'react-router-dom';
import About from '../pages/about/about.jsx';
import App from '../App.jsx';
import Authentication from '../pages/auth/authentication.jsx';
import Register from "../pages/products/category/Register.jsx";
import ProductRegister from "../pages/products/product/productRegister.jsx";
import ProductTable from '../pages/products/list/productTable.jsx';
// import Register from "../pages/products/category/Register.jsx";

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <About/>,
    },
    {
        path: '/auth',
        element: <Authentication/>,
    },
    {
        path: '/app',
        element: <App/>,
        children: [
            {
                path: 'about',
                element: <About/>
            },
            {
                path: 'categoryRegister',
                element: <Register/>
            },
            {
                path: 'productRegister',
                element: <ProductRegister/>
            },
            {
                path: 'productList',
                element: <ProductTable/>
            }
        ]
    }
]);

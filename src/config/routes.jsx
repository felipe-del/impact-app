import { createBrowserRouter } from 'react-router-dom';
import About from '../pages/about/about.jsx';
import App from '../App.jsx';
import Authentication from '../pages/auth/authentication.jsx';
import SupplierForm from '../pages/supplierForm/supplierForm.jsx';
import AssetForm from '../pages/assetForm/assetForm.jsx';
import Register from "../pages/products/category/Register.jsx";
import ProductRegister from "../pages/products/product/productRegister.jsx";
import ProductTable from '../pages/products/list/productTable.jsx';

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
                path: 'createSupplier',
                element: <SupplierForm/>
            },
            {
                path: 'createAsset',
                element: <AssetForm/>
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

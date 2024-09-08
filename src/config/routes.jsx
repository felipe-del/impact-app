import { createBrowserRouter } from 'react-router-dom';
import About from '../pages/about/about.jsx';
import App from '../App.jsx';
import Authentication from '../pages/auth/authentication.jsx';
import SupplierForm from '../pages/supplierForm/supplierForm.jsx';
import AssetForm from '../pages/assetForm/assetForm.jsx';

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
            }
        ]
    }
]);

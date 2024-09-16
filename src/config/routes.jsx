import { createBrowserRouter } from 'react-router-dom';
import About from '../pages/about/about.jsx';
import App from '../App.jsx';
import Authentication from '../pages/auth/authentication.jsx';
import SupplierForm from '../pages/supplierForm/supplierForm.jsx';
import Register from "../pages/products/category/Register.jsx";
import ProductRegister from "../pages/products/product/productRegister.jsx";
import ProductTable from '../pages/products/list/productTable.jsx';
import SpaceTable from '../pages/spaces/list/spaceTable.jsx';
import CreateAsset from '../pages/asset/createAsset/createAsset.jsx';
import AddSupplier from '../pages/supplier/addSupplier.jsx';
import AddBrand from '../pages/brand/addBrand.jsx';
import AddCategory from '../pages/asset/addAssetCategory/addCategory.jsx';
import AddBuildingLocation from "../pages/commonSpace/buildingLocation/addBuildingLocation.jsx";
import AddSpace from "../pages/commonSpace/space/addSpace.jsx";
import AddBuilding from "../pages/commonSpace/building/addBuilding.jsx";
import AddSpaceType from "../pages/commonSpace/spaceType/addSpaceType.jsx";

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
                element: <CreateAsset/>
            },
            {
                path: 'addSupplier',
                element: <AddSupplier/>
            },
            {
                path: 'addBrand',
                element: <AddBrand/>
            },
            {
                path: 'addCategory',
                element: <AddCategory/>
            },
            {
                path: 'categoryRegister',
                element: <Register/>
            },
            {
                path: 'addBuilding',
                element: <AddBuilding/>
            },
            {
                path: 'addBuildingLocation',
                element: <AddBuildingLocation/>
            },
            {
                path: 'addSpaceType',
                element: <AddSpaceType/>
            },
            {
                path: 'addSpace',
                element: <AddSpace/>
            },
            {
                path: 'productRegister',
                element: <ProductRegister/>
            },
            {
                path: 'productList',
                element: <ProductTable/>
            },
            {
                path: 'spaceList',
                element: <SpaceTable/>
            }
        ]
    }
]);

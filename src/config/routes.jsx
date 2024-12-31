import { createBrowserRouter } from 'react-router-dom';
import About from '../pages/about/about.jsx';
import App from '../App.jsx';
import Authentication from '../pages/auth/authentication.jsx';
import Register from "../pages/products/category/Register.jsx";
import ProductRegister from "../pages/products/product/productRegister.jsx";
import ProductTable from '../pages/products/list/productTable.jsx';
import SpaceTable from '../pages/commonSpace/list/spaceTable.jsx';
import CreateAsset from '../pages/asset/createAsset/createAsset.jsx';
import AddCategory from '../pages/asset/addAssetCategory/addCategory.jsx';
import AddBuildingLocation from "../pages/commonSpace/buildingLocation/addBuildingLocation.jsx";
import AddSpace from "../pages/commonSpace/space/addSpace/addSpace.jsx";
import AddBuilding from "../pages/commonSpace/building/addBuilding.jsx";
import InventoryTable from '../pages/products/inventory/inventoryTable.jsx';
import AssetTable from '../pages/asset/list/assetTable.jsx';
import AddAssetModel from '../pages/asset/addAssetModel/addAssetModel.jsx';
import AddSubcategory from '../pages/asset/addAssetSubcategory/addAssetSubcategory.jsx';
import AssetLoanRequest from '../pages/asset/loan/loanRequest .jsx';
import ProductRequest from '../pages/products/loan/productRequest.jsx';
import Dashboard from '../pages/dashboard/dashboard.jsx';
import AddBrand from '../pages/asset/addBrand/addBrand.jsx';
import AddSupplier from '../pages/asset/supplier/addSupplier.jsx';
import AddLocationNumber from '../pages/asset/addLocationNumber/addLocationNumber.jsx';
import AddLocationType from '../pages/asset/addLocationType/addLocationType.jsx';
import CategoryEdit  from '../pages/products/category/CategoryEdit.jsx';
import ProductEdit from '../pages/products/product/productEdit.jsx';
import EditSpace from "../pages/commonSpace/space/editSpace/editSpace.jsx";
import EditAsset from '../pages/asset/editAsset/editAsset.jsx';
import AddSpaceEquipment from '../pages/commonSpace/equipment/addEquipment.jsx';
import SpaceRequest from "../pages/commonSpace/space/spaceRequest/spaceRequest.jsx";
import Users from '../pages/users/users.jsx';
import LoginRegister from "../pages/login_register/LoginRegister.jsx";

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
        path: '/loginRegister',
        element: <LoginRegister/>
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
            },
            {
                path: 'editSpace',
                element: <EditSpace/>
            },
            {
                path: 'spaceRequest',
                element: <SpaceRequest/>
            },
            {
                path: 'inventoryList',
                element: <InventoryTable/>
            },
            {
                path: 'assetList',
                element: <AssetTable/>
            },
            {
                path: 'addAssetModel',
                element: <AddAssetModel/>
            },
            {
                path: 'addSubcategory',
                element: <AddSubcategory/>
            },
            {
                path: 'assetLoanRequest',
                element: <AssetLoanRequest/>
            },
            {
                path: 'productLoanRequest',
                element: <ProductRequest/>
            },
            {
                path: 'dashboard',
                element: <Dashboard/>
            },
            {
                path: 'addLocationNumber',
                element: <AddLocationNumber/>
            },
            {
                path: 'addLocationType',
                element: <AddLocationType/>
            },
            {
                path: 'categoryEdit/:id',
                element: <CategoryEdit/>
            },
            {
                path: 'productEdit/:id',
                element: <ProductEdit/>
            },
            {   path: 'editAsset/:id',
                element: <EditAsset/>
        
            },
            {
                path:'addSpaceEquipment',
                element:<AddSpaceEquipment/>
            },
			{
                path: 'manageUsers',
            	element: <Users/>
			}
        ]
    }
]);

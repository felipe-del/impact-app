import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthToggle from "../views/auth/loginAndRegister/AuthToggle.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import About from "../views/about/About.jsx";
import NotFound from "../views/exception/notFound/NotFound.jsx";
import ResetPasswordToggle from "../views/auth/changePassword/ResetPasswordToggle.jsx";
import UserTable from "../views/user/UserTable.jsx";
import Unauthorized from "../views/exception/unauthorized/Unauthorized.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import CreateUser from "../views/user/CreateUser.jsx";
import AssetTable from "../views/asset/AssetTable.jsx";
import Dashboard from "../views/dashboard/Dashboard.jsx";
import CreateAsset from "../views/asset/CreateAsset.jsx";
import Profile from "../views/user/Profile.jsx";
import UpdateAsset from "../views/asset/UpdateAsset.jsx";
import BrandManagement from "../views/brand/BrandManagement.jsx";
import SupplierManagement from "../views/supplier/SupplierManagement.jsx";
import AssetCategoryManagement from "../views/category/AssetCategoryManagement.jsx";
import AssetModelManagement from "../views/assetModel/AssetModelManagement.jsx";
import AssetSubCategoryManagement from "../views/assetSubCategory/AssetSubCategoryManagement.jsx";
import SpaceEquipmentManagement from "../views/spaceEquipment/SpaceEquipmentManagement.jsx";
import SpaceManagement from "../views/space/SpaceManagement.jsx";
import ProductManagement from "../views/product/ProductManagement.jsx";
import LocationTypeManagement from "../views/locationType/LocationTypeManagement.jsx";
import LocationNumberManagement from "../views/locationNumber/LocationNumberManagement.jsx";
import ProductCategoryManagement from "../views/productCategory/ProductCategoryManagement.jsx";
import ProductCategoryTypeManagement from "../views/productCategoryType/ProductCategoryTypeManagement.jsx";
import AssetLoan from "../views/asset/AssetLoan.jsx";
import MyRequest from "../views/requestHistory/myRequest/MyRequest.jsx";
import Home from "../views/home/Home.jsx";
import CreateSpace from "../views/space/CreateSpace.jsx";
import BuildingManagement from "../views/building/BuildingManagement.jsx";
import BuildingLocationManagement from "../views/buildingLocation/BuildingLocationManagement.jsx";
import UpdateSpace from "../views/space/UpdateSpace.jsx";
import CreateProduct from "../views/product/CreateProduct.jsx";
import UpdateProduct from "../views/product/UpdateProduct.jsx";
import ProductLoan from "../views/product/ProductLoan.jsx";
import SpaceLoan from "../views/space/SpaceLoan.jsx";
import AllRequest from "../views/requestHistory/allRequest/AllRequest.jsx";
import RequestManagement from "../views/requestHistory/requestManagement/RequestManagement.jsx";
import AssetRenewalTable from "../views/asset/AssetRenewalTable.jsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/auth" element={<AuthToggle />} />
                <Route path="/forgot-password" element={<ResetPasswordToggle />} />

                <Route element={<AppLayout />} path="/app">
                    <Route index element={<Home/>} />
                    <Route path="profile" element={<Profile/>} />
                    <Route element={<ProtectedRoute allowedRoles={["ADMINISTRATOR", "MANAGER"]} />}>
                        <Route path="brandManagement" element={<BrandManagement/>} />
                        <Route path="assetCategoryManagement" element={<AssetCategoryManagement/>} />
                        <Route path="assetModelManagement" element={<AssetModelManagement/>} />
                        <Route path="assetSubCategoryManagement" element={<AssetSubCategoryManagement/>} />
                        <Route path="spaceEquipmentManagement" element={<SpaceEquipmentManagement/>} />
                        <Route path="locationTypeManagement" element={<LocationTypeManagement/>} />
                        <Route path="locationNumberManagement" element={<LocationNumberManagement/>} />
                        <Route path="productCategoryManagement" element={<ProductCategoryManagement/>} />
                        <Route path="createProduct" element={<CreateProduct/>} />
                        <Route path="productCategoryTypeManagement" element={<ProductCategoryTypeManagement/>} />
                        <Route path="updateProduct/:id" element={<UpdateProduct/>} />
                        <Route path="spaceManagement" element={<SpaceManagement/>} />
                        <Route path="editSpace/:id" element={<UpdateSpace/>} />
                        <Route path="productManagement" element={<ProductManagement/>} />
                        <Route path="createSpace" element={<CreateSpace />} />
                        <Route path="buildingManagement" element={<BuildingManagement />} />
                        <Route path="buildingLocationManagement" element={<BuildingLocationManagement />} />
                        <Route path="supplierManagement" element={<SupplierManagement/>} />
                        <Route path="userTable" element={<UserTable />} />
                        <Route path="createUser" element={<CreateUser />} />
                        <Route path="assetTable" element={<AssetTable />} />
                        <Route path="createAsset" element={<CreateAsset/>} />
                        <Route path="editAsset/:id" element={<UpdateAsset/>} />
                        <Route path="allRequest" element={<AllRequest/>}/>
                        <Route path="requestManagement" element={<RequestManagement/>}/>
                        <Route path="assetRenewalTable" element={<AssetRenewalTable/>}/>
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={["ADMINISTRATOR", "MANAGER","TEACHER"]} />}>
                        <Route path="productLoan" element={<ProductLoan/>} />
                        <Route path="spaceLoan" element={<SpaceLoan/>} />
                        <Route path="assetLoan" element={<AssetLoan/>} />
                        <Route path="myRequest" element={<MyRequest/>} />
                    </Route>
                </Route>

                {/* Page not found */}
                <Route path="*" element={<NotFound />} />

                {/* Page Unauthorized */}
                <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
        </BrowserRouter>
    );
}

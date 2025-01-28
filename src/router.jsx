import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthToggle from "./views/auth/loginAndRegister/AuthToggle.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import About from "./components/about/About.jsx";
import DataTable from "./components/DataTable.jsx";
import NotFound from "./components/notFound/NotFound.jsx";
import ResetPasswordToggle from "./views/auth/changePassword/ResetPasswordToggle.jsx";
import UserManagement from "./views/user/UserManagement.jsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path={'/'} element={<About/>}/>

                <Route element={<AuthLayout/>}>
                    <Route path='/auth' element={<AuthToggle/>}/>
                </Route>

                <Route path='/forgot-password' element={<ResetPasswordToggle/>}/>

                <Route element={<AppLayout /> } path="/app">
                    <Route index element={<DataTable />} />
                    <Route path="userManagement" element={<UserManagement/>}/>
                </Route>

                {/* Page not found */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    )
}
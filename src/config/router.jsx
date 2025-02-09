import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthToggle from "../views/auth/loginAndRegister/AuthToggle.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import About from "../views/about/About.jsx";
import NotFound from "../views/exception/notFound/NotFound.jsx";
import ResetPasswordToggle from "../views/auth/changePassword/ResetPasswordToggle.jsx";
import UserTable from "../views/user/UserTable.jsx";
import Unauthorized from "../views/exception/unauthorized/Unauthorized.jsx";
import ProtectedRoute from "./protectedRoute.jsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path={'/'} element={<About/>}/>
                <Route path='/auth' element={<AuthToggle/>}/>
                <Route path='/forgot-password' element={<ResetPasswordToggle/>}/>

                <Route element={<AppLayout/>} path="/app">
                    <Route element={<ProtectedRoute allowedRoles={["ADMINISTRATOR", "MANAGER"]} />}>
                        <Route path="userTable" element={<UserTable/>}/>
                    </Route>
                </Route>

                {/* Page not found */}
                <Route path="*" element={<NotFound/>}/>

                {/* Page Unauthorized */}
                <Route path="/unauthorized" element={<Unauthorized/>}/>

            </Routes>
        </BrowserRouter>
    )
}


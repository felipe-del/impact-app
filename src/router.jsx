import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthToggle from "./views/auth/AuthToggle.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import About from "./components/about/About.jsx";
import DataTable from "./components/DataTable.jsx";
import NotFound from "./components/notFound/NotFound.jsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<About/>}/>

                <Route element={<AuthLayout/>}>
                    <Route path='/auth' element={<AuthToggle/>}/>
                </Route>

                <Route element={<AppLayout />}>
                    <Route path="/app" element={<DataTable />} />
                </Route>

                {/* Page not found */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    )
}
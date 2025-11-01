import { Outlet } from "react-router-dom";

export default function Layout(){
    return <div>
        Layout page.
        <div>
            <Outlet/>
        </div>
    </div>
}
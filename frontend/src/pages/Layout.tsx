import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/Home/Footer";

export default function Layout(){
    return <div>
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    </div>
}
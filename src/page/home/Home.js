import Navbar from "../../component/Navbar";
import Sidebar from "../../component/SideBar";
import {Outlet} from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="nav-bar" >
                <Navbar></Navbar>
            </div>
            <div className="container-sidebar">
                <div className='nav-sidebar-left'>
                    <Sidebar></Sidebar>
                </div>
                <div className="middle">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}
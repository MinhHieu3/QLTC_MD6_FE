import Navbar from "../../component/Navbar";
import Sidebar from "../../component/SideBar";
import {Outlet} from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="container-row">
                <div className="sidebar-col-2">
                        <Sidebar></Sidebar>
                </div>
                <div className="content-col-10">
                        <div className="nav-bar">
                            <Navbar></Navbar>
                        </div>
                        <div className="middle">
                            <Outlet></Outlet>
                        </div>
                </div>
            </div>
        </>
    )
}
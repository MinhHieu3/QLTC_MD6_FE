
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/SideBar";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getWallets} from "../../service/wallet/walletService";
import {useEffect} from "react";


export default function Home() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const wallets = useSelector(state => {
        return state.wallets.wallets
    });

    const selectedWalletIndex = useSelector(state =>{
        return  state.wallets.index;
    });
    const handlerWallet = () => {
        dispatch(getWallets({id: users.id, token: users.accessToken}))

    }
    useEffect(() => {
        handlerWallet()
    }, [])

    return (
        <>
            <div className="container-row">
                <div className="sidebar-col-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="content-col-10">
                    <div className="nav-bar">
                        <Navbar wallets={wallets} selectedWalletIndex={selectedWalletIndex}></Navbar>
                    </div>
                    <div className="middle">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    )
}

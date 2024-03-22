import "./page/login/login.css";
import "./page/home/Home.css";
import './App.css';
import {Route, Routes} from "react-router-dom";
import HomeLogin from "./page/login/HomeLogin";
import Login from "./page/login/Login";
import Register from "./page/login/Register";
import Home from "./page/home/Home";
import {useSelector} from "react-redux";
import AddWallet from "./page/wallet/createWallet/AddWallet";
import Wallet from "./page/wallet/Wallet";
import {Profiler} from "react";
import Account from "./page/account/Account";
import EditWallet from "./page/wallet/updateWallet/EditWallet";
import TransferMoney from "./page/wallet/ transfers/TransferMoney";
import ListWallet from "./page/wallet/listWallets/ListWallet";
function App() {
    const users = useSelector(state => {
        return state.users.users
    })
    return (
        <>
            <Routes>
                <Route path={"/login"} element={<HomeLogin/>}>
                    <Route path={''} element={<Login/>}></Route>
                    <Route path={'register'} element={<Register/>}></Route>
                </Route>
                {
                    users !== null ?
                        <Route path={'home'} element={<Home/>}>
                            <Route path={''} element={<Wallet/>}></Route>
                            <Route path={'add-wallets'} element={<AddWallet/>}></Route>
                            <Route path={'edit-wallets/:id'} element={<EditWallet/>}></Route>
                            <Route path={'profile'} element={<Account/>}></Route>
                            <Route path={'profile-wallets'} element={<ListWallet/>}></Route>
                            {/*<Route path={'transferMoney'} element={<TransferMoney/>}></Route>*/}
                        </Route> :
                        <Route path={"/login"} element={<HomeLogin/>}></Route>
                }
            </Routes>
        </>
    );
}
export default App;

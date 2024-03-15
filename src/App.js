import "./page/login/login.css";
import './App.css';
import Wallet from "./page/wallet/showWallet/showWallet";
import {Route, Routes} from "react-router-dom";
import HomeLogin from "./page/login/HomeLogin";
import Login from "./page/login/Login";
import Register from "./page/login/Register";
import Home from "./page/home/Home";
import {useSelector} from "react-redux";
function App() {
    const users = useSelector(state => {
        console.log(state.users.users)
        return state.users.users
    })
    return (
        <>
            <Wallet></Wallet>
            <Routes>
                <Route path={"/login"} element={<HomeLogin/>}>
                    <Route path={''} element={<Login/>}></Route>
                    <Route path={'register'} element={<Register/>}></Route>
                </Route>
                {
                    users !== null ?
                        <Route path={'/home'} element={<Home/>}>
                        </Route> :
                        <Route path={"/login"} element={<HomeLogin/>}></Route>

                }
            </Routes>
        </>
    );
}

export default App;

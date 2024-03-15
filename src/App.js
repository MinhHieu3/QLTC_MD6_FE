import "./page/login/login.css";
import "./page/home/home.css";
import './App.css';

import {Route, Routes} from "react-router-dom";
import HomeLogin from "./page/login/HomeLogin";
import Login from "./page/login/Login";
import Register from "./page/login/Register";
import {useSelector} from "react-redux";
import Home from "./page/home/Home";

function App() {
    const users = useSelector(state => {
        console.log(state.users.users)
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
                        <Route path={'/home'} element={<Home/>}>
                        </Route> :
                        <Route path={"/login"} element={<HomeLogin/>}></Route>
                }
            </Routes>
        </>
    );
}

export default App;

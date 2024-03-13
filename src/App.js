import "./page/login/login.css";
import './App.css';

import {Route, Routes} from "react-router-dom";
import HomeLogin from "./page/login/HomeLogin";
import Login from "./page/login/Login";
import Register from "./page/login/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/login"} element={<HomeLogin/>}>
          <Route path={''} element={<Login/>}></Route>
          <Route path={'register'} element={<Register/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./store";

function Login(){
    let username=useRef(null);
    let password=useRef(null);
    let dispatch=useDispatch();
    let navigate=useNavigate();
   let [isAuthenticated, setIsAuthenticated]=useState(false);
   let logincheck=()=>{
    username.current.value === "zoro" &&
    password.current.value === "zoro@123" ? 
    setIsAuthenticated(true):setIsAuthenticated(false);
   }
   {
    isAuthenticated ? "Your Login is successful":"Your credentials are not right, please check once!"
   }
    return(
        <>
        <h1>Login Page</h1>
        <label>Username:</label>
        <input type="text" ref={username} />
        <br></br>
        <label>Password:</label>
        <input type="password" ref={password} />
        <br></br>
        <button style={{backgroundColor:"green"}} onClick={logincheck}>Login</button>
        </>
    )
    
}
export default Login;
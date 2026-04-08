import {useState } from "react";
import {login} from "../services/authService";


export default function Login(){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const handleLogin= async () =>{
        try{
            await login(email,password);
            alert("Login successful");
        }catch(err){
            console.error(err);
            alert("Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            
            <input type="password"placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};


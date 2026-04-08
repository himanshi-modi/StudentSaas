import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(email, password);

    setTimeout(() => {
      if (userData?.role === "admin") navigate("/admin");
      if (userData?.role === "teacher") navigate("/teacher");
      if (userData?.role === "student") navigate("/student");
    }, 500);
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigare = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return <AuthLayout>
    <div className="">
      <h3 className="">Welcome Back</h3>
      <p className="">
        Please enter your details to log in
      </p>
    </div>
  </AuthLayout>;
};

export default Login;

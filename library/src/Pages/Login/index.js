import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../services/users";



function Login() {
 const navigate=useNavigate()
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token",response.data)
        window.location.href = "/";
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message)
      
    }
  }
    
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
     navigate("/");
    }
  },[])

  return (
    <div className="h-screen bg-primary flex items-center justify-center">
      <div className="authentication-form bg-white p-3 rounded">
        <h1 className="text-secondary text-2xl font-bold mb-1 text-center">
          LOGIN
        </h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <input type="password" placeholder="Password" />
          </Form.Item>
          <div className="text-center mt-2 flex flex-col gap-1">
            <Button title="Login" type="submit" />
            <Link to="/register" className="text-primary text-sm underline">
              Don't have an account? Click Here To Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;

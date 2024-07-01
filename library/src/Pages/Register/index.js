import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./Register.css"; // Assuming you have a CSS file for custom styles
import Button from "../../Components/Button";
import { RegisterUser } from "../../services/users";
import { Form, message, Input } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/loadersSlice";



function Register() {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await RegisterUser(values);
      dispatch(HideLoading())
      console.log(response);
      if (response.success) {
        message.success(response.message);
        navigate("/login")
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message);
    }
  };
 useEffect(() => {
   const token = localStorage.getItem("token");
   if (token) {
  navigate('/')
   }
 }, []);
  return (
    <div className="register-container h-screen bg-primary flex items-center justify-center">
      <div className="authentication-form bg-white p-6 rounded shadow-lg">
        <h1 className="text-secondary text-2xl font-bold mb-4 text-center">
          REGISTER
        </h1>
        <hr className="mb-4" />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
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
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input type="number" placeholder="Phone Number" />
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
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <div className="text-center mt-2">
            <Button title="Register" type="submit" />
            <br />
            <br />
            <Link to="/login" className="text-primary text-sm underline">
              Already have an account? Click Here To Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;

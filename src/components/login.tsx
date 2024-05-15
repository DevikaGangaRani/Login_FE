import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Forgotpassword from "./forgotPasswordd";
import { Header } from "antd/es/layout/layout";
import Navbar from "./navbar";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5567/login/authenticate",
        {
          username: username,
          password: password,
        }
      );

      const responseData = response.data;
      if (responseData.success) {
        message.success("Login successful!");
        setUsername("");
        setPassword("");
      } else {
        message.error(responseData.message);
      }
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        message.error(error.response.data.message);
      } else {
        message.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      {/* <Navbar/> */}
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", margin: "20px" }}>
          <label
            htmlFor="username"
            style={{ marginRight: "20px", fontWeight: "bold" }}
          >
            Username:
          </label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ display: "flex", margin: "20px" }}>
          <label
            htmlFor="password"
            style={{ marginRight: "20px", fontWeight: "bold" }}
          >
            Password:
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </Form>
      <Button type="primary" onClick={onSubmit}>
        Submit
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Link to={`/user/create`}>
          <p>create new user</p>
        </Link>
        <Forgotpassword />
      </div>
    </>
  );
};

export default LoginForm;

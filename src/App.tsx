// App.js
import React, { useState } from "react";
import "./App.css";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginNew from "./components/newLogin";
import Admin from "./components/admin";
import BlockRecords from "./components/blockRecords";
import UserPassword from "./components/userPassword";
import PrimeUsers from "./components/primieUsers";
// import Slider from './components/slider';
import { useNavigate } from "react-router-dom";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu } from "antd";
const { Content, Footer, Sider } = Layout;
// type MenuItem = Required<MenuProps>["items"][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//   getItem('User', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];

type NavigationMappingType = {
  "user-login": string;
  "user-create": string;
  "admin-actions": string;
  "admin-password-history": string;
  "admin-user-block-list": string;
  "admin-prime-user": string;
};

const navigationMapping: NavigationMappingType = {
  "user-login": "/",
  "user-create": "/user/create",
  "admin-actions": "/admin",
  "admin-password-history": "/admin/password",
  "admin-user-block-list": "/admin/block",
  "admin-prime-user": "/admin/prime",
};

const items = [
  {
    key: "user",
    icon: <PieChartOutlined style={{ color: "#fff" }} />,
    label: "User",
    children: [
      { key: "user-login", label: "User Login" },
      { key: "user-create", label: "Create User" },
    ],
  },
  {
    key: "admin",
    icon: <UserOutlined style={{ color: "#fff" }} />,
    label: "Admin",
    children: [
      { key: "admin-actions", label: "Activate/Deactivate" },
      { key: "admin-password-history", label: "Password History" },
      { key: "admin-user-block-list", label: "User Blocklist" },
      { key: "admin-prime-user", label: "Prime Users" },
    ],
  },
];

function App() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: "100vh", padding: 0 }}>
      <Sider
        collapsible={false}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" /> . onn
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            color: "#fff",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }: any) => {
            // window.open(
            //   navigationMapping[key as keyof NavigationMappingType],
            //   "_self"
            // );

            navigate(navigationMapping[key as keyof NavigationMappingType]);
          }}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div className="App">
            <Routes>
              {/* <Route path="/" element={<LoginPage/>}/> */}
              <Route path="/" element={<Login />} />
              <Route path="/user/create" element={<LoginNew />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/block" element={<BlockRecords />} />
              <Route path="/admin/password" element={<UserPassword />} />
              <Route path="/admin/prime" element={<PrimeUsers />} />
            </Routes>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
}

export default App;

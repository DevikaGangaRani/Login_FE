import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Routes, Route } from 'react-router-dom';
import LoginNew from './newLogin';
import Admin from './admin';
import BlockRecords from './blockRecords';
import UserPassword from './userPassword';
import PrimeUsers from './primieUsers';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const SliderForm: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu key="sub1" title="Users">
            <Menu.Item key="1">
              <Link to="/user/create">Create New User</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title="Admin">
            <Menu.Item key="2">
              <Link to="/admin">Activate/Deactivate</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/admin/block">Block Users</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/prime">Prime Users</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/admin/password">Password History</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Link to="/files">Files</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Routes>
            <Route path="/user/create" element={<LoginNew />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/block" element={<BlockRecords />} />
            <Route path="/admin/prime" element={<PrimeUsers />} />
            <Route path="/admin/password" element={<UserPassword />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SliderForm;

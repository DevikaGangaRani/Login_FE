import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import axios from 'axios';
import Navbar from './navbar';

type Record = {
    Login_Id: number;
    UserName: string;
    Email: string;
    Password: string;
    Contact: number;
    Activated: boolean;
}

const BlockRecords: React.FC = () => {
  const [data, setData] = useState<Record[]>([]); 

  useEffect(() => {
    showAll()
  },[])

  const showAll = () => {
    axios.post('http://localhost:5567/login/showBockedUsers')
    .then(res => {
      console.log(res.data)
      setData(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleUnblockUser = (data: Record) => {
    const { Login_Id } = data;
    axios.post(`http://localhost:5567/login/setUserUnblock/${Login_Id}`)
      .then(response => {
        showAll();
        message.success('User unblocked successfully!');
      })
      .catch(error => {
        if (error.response && error.response.data.message) {
          message.error(error.response.data.message);
        } else {
          message.error('An error occurred while unblocking the user.');
        }
        console.error('Error unblocking user:', error);
      });
  };
  
  const columns = [
    {
      title: 'Login Id',
      dataIndex: 'Login_Id',
      key: 'Login_Id',
    },
    {
      title: 'User Name',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Contact',
      dataIndex: 'Contact',
      key: 'Contact',
    },
    {
      key: 'action',
      render: (Login_Id: Record) => (
        <div style={{ display: 'flex', gap: '20px'}}>
          <Button onClick={() => handleUnblockUser(Login_Id)}>unBlock</Button>
        </div>
      ),
    },
  ];

  return (
    <>
    {/* <Navbar/> */}
    <div>
        <Table dataSource={data} columns={columns} style={{margin:'15px 90px'}}/>
    </div>
    </>
  );
};

export default BlockRecords;

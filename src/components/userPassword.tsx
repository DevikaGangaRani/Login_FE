import React, { useEffect, useState } from 'react';
import { Input, Select, Table, message } from 'antd';
import axios from 'axios';
import Navbar from './navbar';

const { Option } = Select;

const UserPassword: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    dropdownOpt(); 
  }, []);

  const showAll = (UserName: string) => {
    axios.post(`http://localhost:5567/password/getData/${UserName}`)
      .then(res => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err);
        message.error('An error occurred while fetching data.');
      });
  };

  const dropdownOpt = () => {
    axios.post('http://localhost:5567/login/showall')
    .then(res => {
      const userNames = res.data.map((item: { UserName: any; }) => item.UserName);
      setOptions(userNames);
    })
    .catch(error => {
      console.error('Error fetching dropdown options:', error);
    });
  }

  const handleInputChange = (value: string) => {
      showAll(value);
};


  const columns = [
    {
      title: 'User Name',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: 'Old Password',
      dataIndex: 'old_password',
      key: 'old_password',
    },
    {
      title: 'New Password',
      dataIndex: 'new_password',
      key: 'new_password',
    },
    {
      title: 'Changed On',
      dataIndex: 'changed_on',
      key: 'changed_on',
    },
  ];

  return (
    <>
    {/* <Navbar/> */}
    <div>
       <Select
        style={{ width: 200, marginTop:'30px' }}
        placeholder="Select a user"
        onChange={handleInputChange}
      >
        {options.map((option, index) => (
          <Option key={index} value={option}>{option}</Option>
        ))}
      </Select>
      <Table dataSource={data} columns={columns} style={{ margin: '15px 90px' }} />
    </div>
    </>
  );
};

export default UserPassword;

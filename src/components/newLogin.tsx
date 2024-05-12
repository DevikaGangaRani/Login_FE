import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import './newLogin.css'
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

const LoginNew: React.FC = () => {
  const [data, setData] = useState<Record[]>([]); 
  const [formData, setFormData] = useState<any>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = async() => {
    const requiredFields = ['UserName', 'Email', 'Password', 'Contact']
    const isValid = requiredFields.every(field => formData[field])
    if (!isValid) {
      message.error('Please fill all required fields');
      return;
    }
    axios.post('http://localhost:5567/login/create', formData)
    .then(response => {
        console.log('Response:', response.data, '111');
        setData([...data, formData]);
        message.success('new user added')
        window.location.reload()
        setFormData({})

      })
      .catch(error => {
        console.error('Error:', error);
        if (error.response && error.response.data && error.response.data.message) {
          message.error(error.response.data.message);
        } else {
          message.error('An error occurred while creating the user. Please try again later.');
        }
      });
  }

  const handleButtonClick = () => {
    if (formData.Password !== formData.CPassword) {
      message.error("Passwords don't match!");
      return;
    }
    onSubmit();
  };

  return (
    <>
    {/* <Navbar/> */}
    <div style={{display:'flex', justifyItems:'center', alignItems:'center', flexDirection:'column', marginTop:'30px'}}>
      <Form className="FormContainer">
        <div>
          <p>UserName </p>
          <Input name='UserName' placeholder='Enter UserName' onChange={handleInputChange} value={formData.UserName || ''}/>
        </div>
        <div>
          <p>Email</p>
          <Input name='Email' placeholder='Enter User Email' onChange={handleInputChange} value={formData.Email || ''}/>
        </div>
        <div>
          <p>Password </p>
          <Input name='Password' placeholder='Enter Password' onChange={handleInputChange} value={formData.Password || ''}/>
        </div>
        <div>
          <p>Confirm-Password </p>
          <Input name='CPassword' type="password" placeholder='Confirm Password' onChange={handleInputChange} value={formData.CPassword || ''} />
        </div>
        <div>
          <p>Contact </p>
          <Input name='Contact' placeholder='Enter Contact' onChange={handleInputChange} value={formData.Contact || ''}/>
        </div>
      </Form>
      <div style={{display:'flex', gap:'20px'}}>
        <Button type='primary' onClick={handleButtonClick}>Submit</Button>
        <Link to={'/'}>
        <Button>Go to login page</Button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default LoginNew;

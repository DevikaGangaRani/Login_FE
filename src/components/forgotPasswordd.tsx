import React, { useState } from 'react';
import { Modal, Input, Button, Typography, message } from 'antd';
import axios from 'axios';
import { response } from 'express';

const { Text, Link } = Typography;

const ForgotPassword: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setEmail('');
    setOtp('');
    setOtpSent(false);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordModalVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendOTP = () => {
    console.log('Sending OTP to:', email);
    axios.post(`http://localhost:5567/otp/sendOTP/${email}`)
      .then(response => {
        message.success('OTP sent to your email. Please check your mailbox.');
        setOtpSent(true);
      })
      .catch(error => {
        console.error('Error sending OTP:', error);
        message.error('Error sending OTP. Please try again later.');
      });
  };

  const handleInputChangeOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleValidateOTP = async () => {
    try {
      const response = await axios.post(`http://localhost:5567/otp/validateOTP/${email}/${otp}`);
      console.log('Validating OTP:', otp);
      setEmail('');
      setOtp('');
      setVisible(false);
      if (response.data === true) {
        message.success('Successfully verified your OTP');
        setPasswordModalVisible(true); 
      } else {
        message.error('OTP was wrong');
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
      message.error('Failed to validate OTP. Please try again.');
    }
  };

  const handleOkPasswordModal = () => {
    if (newPassword !== confirmPassword) {
      message.error('New password and confirm password do not match');
      return;
    }
    axios.post('http://localhost:5567/password/create', { new_password: newPassword })
    .then(response => {
      message.success('Password Changed successfully.');
    })
    setPasswordModalVisible(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <Text>
        <Link onClick={showModal}>Forget Password?</Link>
      </Text>
      <Modal
        title="Forget Password"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          otpSent ? (
            <Button key="validateOTP" type="primary" onClick={handleValidateOTP}>
              Validate OTP
            </Button>
          ) : (
            <Button key="sendOTP" type="primary" onClick={handleSendOTP}>
              Send OTP
            </Button>
          ),
        ]}
      >
         <Text>
          Remember your password?<Link href="/" style={{marginLeft:'10px'}}>click here</Link>
        </Text>
        <div style={{display:'flex', flexDirection:'column'}}>
        <Text>Please Enter your mail</Text>
        <Input placeholder="Enter your email" value={email} onChange={handleInputChange} />
        </div>
        {otpSent && (
          <>
            <Text>Please Enter your OTP</Text>
            <Input placeholder="Enter OTP" value={otp} onChange={handleInputChangeOTP} />
          </>
        )}
       
      </Modal>
      
      <Modal
        title="Enter New Password"
        open={passwordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setPasswordModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOkPasswordModal}>
            OK
          </Button>,
        ]}
      >
        <Text>Enter New Password</Text>
        <Input.Password 
          placeholder="New Password" 
          value={newPassword} 
          onChange={e => setNewPassword(e.target.value)} 
        />
        <Text>Enter Confirm Password</Text>
        <Input.Password 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={e => setConfirmPassword(e.target.value)} 
        />
      </Modal>
    </>
  );
};

export default ForgotPassword;

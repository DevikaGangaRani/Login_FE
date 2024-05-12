import React, { useEffect, useState } from 'react';
import { Button, Spin, Table, message } from 'antd';
import axios from 'axios';
import Navbar from './navbar';

type Record = {
  Login_Id: number;
  UserName: string;
  Email: string;
  Password: string;
  Contact: number;
  Activated: boolean;
  isActive?: boolean
}



const Admin: React.FC = () => {
  const [data, setData] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  useEffect(() => {
    showAll()
  }, [])

  const showAll = (page = 1) => {
    setLoading(true);
    axios.post('http://localhost:5567/login/showall', { page })
      .then(res => {
        console.log(res.data);
        const { todos, totalCount } = res.data;
        setData(todos);
        setPagination(prevState => ({ ...prevState, total: totalCount, current: page }));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const onHandleAction = ({record } :any) => {
    const { Login_Id } = record;
    const type = record?.isActive ? 'deactivate' : 'activate'
    axios.post(`http://localhost:5567/login/${type}/${Login_Id}`)
      .then(response => {
        showAll();
        message.success(`User ${type}d successfully!`);
      })
      .catch(error => {
        console.error('Error activating user:', error);
      })
  }


  // const handleActivate = (data: any) => {
  //   const { Login_Id } = data;
  //   axios.post(`http://localhost:5567/login/activate/${Login_Id}`)
  //     .then(response => {
  //       showAll();
  //       message.success('User activated successfully!');
  //     })
  //     .catch(error => {
  //       console.error('Error activating user:', error);
  //     })
  // };

  // const handleDeactivate = async (data: any) => {
  //   const { Login_Id } = data;
  //   try {
  //     await axios.post(`http://localhost:5567/login/deactivate/${Login_Id}`);
  //     showAll();
  //     message.success('User deactivated successfully!');
  //   } catch (error) {
  //     console.error('Error deactivating user:', error);
  //   }
  // };

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
      title:'Action',
      key: 'action',
      render: (text: any, record: Record) => (
        <div style={{ display: 'flex', gap: '20px' }}>
          <Button onClick={() => onHandleAction({record})} danger={record?.isActive} >
            {record?.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* <Navbar/> */}
      <div>

        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={data}
            columns={columns}
            pagination={pagination}
            onChange={(pagination) => showAll(pagination.current)}
            style={{ margin: '15px 90px' }}
          />
        )}
      </div>
    </>
  );
};

export default Admin;

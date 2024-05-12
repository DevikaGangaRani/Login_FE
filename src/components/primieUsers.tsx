import { Button, Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './navbar';

interface Item {
  id: number;
  name: string;
}

const DragAndDrop: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [data, setData] = useState<Item[]>([]);
  const [droppedItems, setDroppedItems] = useState<Item[]>([]);


  useEffect(() => {
    getUserNames();
    showAll();
    // const storedDroppedItems = localStorage.getItem('droppedItems');
    // if (storedDroppedItems) {
    //   setDroppedItems(JSON.parse(storedDroppedItems));
    // }
  }, []);

  const getUserNames = async () => {
    try {
      let allUserNames: any[] | ((prevState: Item[]) => Item[]) = [];
      let totalPages = 1;
  
      for (let page = 1; page <= totalPages; page++) {
        const res = await axios.post('http://localhost:5567/login/showall', { page });
        const { todos, totalCount, totalPages: totalPageCount } = res.data;
  
        const userNames = todos.map((item: { UserName: any }, index: number) => ({
          id: (page - 1) * 10 + index, 
          name: item.UserName
        }));
        allUserNames = [...allUserNames, ...userNames];
  
        if (totalPageCount > totalPages) {
          totalPages = totalPageCount;
        }
      }
  
      setItems(allUserNames);
    } catch (error) {
      console.error('Error fetching dropdown options:', error);
    }
  };

  const handleDragStart = (e: any, item: Item) => {
    e.dataTransfer.setData('item', JSON.stringify(item));
  };
 
  const handleDrop = async (e: any) => {
    e.preventDefault();
    const droppedItem = JSON.parse(e.dataTransfer.getData('item')) as Item;
    try {
      await axios.post('http://localhost:5567/primeuser/create', { UserName: droppedItem.name });
      console.log(`Record with name: "${droppedItem.name}" created successfully.`, '111');
      setDroppedItems(prevItems => [...prevItems, droppedItem]);
      window.location.reload()
    //   localStorage.setItem('droppedItems', JSON.stringify([...droppedItems, droppedItem]));
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        console.error('Item with this name already exists:', droppedItem.name);
        message.error(`Item with name "${droppedItem.name}" already exists.`);
      } else {
        console.error('Error creating table:', error);
      }
    }
  };
  

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const showAll = () => {
    axios.post('http://localhost:5567/primeuser/getData')
    .then(res => {
        console.log(res.data)
        setData(res.data)
    })
    .catch (err => {
        console.log(err)
    })
  }

  const handleDeleteButton = (Id: number) => {
    axios.post(`http://localhost:5567/primeuser/deleteUser/${Id}`)
    .then((res: { data: any; }) => {
        console.log(res.data);
        showAll();
    })
    .catch ((err: any) => {
        console.log(err);
    });
}


  const columns = [
    {
        title: "Id",
        dataIndex: "Id",
        key: "Id",
    },
    {
        title: "Login Id",
        dataIndex: "Login_Id",
        key: "Login_Id",
    },
    {
        title: "User Name",
        dataIndex: "UserName",
        key: "UserName",
    },
    {
        key: 'action',
        render: (record: { Id: number }) => (
          <div style={{ display: 'flex', gap: '20px'}}>
            <Button onClick={() => handleDeleteButton(record.Id)}>Remove</Button>
          </div>
        ),
      },
  ]

  const primeUserColumn = [
    {
        title: "User Name",
        dataIndex: "UserName",
        key: "UserName",
    }
  ]

  return (
    <>
    {/* <Navbar/> */}
    <div style={{display:"flex"}}>
      <div
        style={{ float: 'left', width: '50%' }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h2>Drag User for prime subscription</h2>
        {items.map((item) => (
          <table
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            style={{display:'flex', justifyContent:'start', alignItems:'center', paddingLeft:'50%'}}
          >
            {item.name}
          </table>
        ))}
      </div>
      <div style={{ float: 'left', width: '50%' }}>
        {droppedItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
    <div style={{ padding:'25px 10%' }}>
        <Table dataSource={data} columns={columns}/>
      </div>
    </>
  );
};

export default DragAndDrop;
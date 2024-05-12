// App.js
import React from 'react';
import './App.css';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginNew from './components/newLogin';
import Admin from './components/admin';
import BlockRecords from './components/blockRecords';
import UserPassword from './components/userPassword';
import PrimeUsers from './components/primieUsers';
import Slider from './components/slider';


function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
        {/* <Route path="/" element={<LoginPage/>}/> */}
          <Route path="/" element={<Login/>}/>
          <Route path="/user/create" element={<LoginNew />} />
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/admin/block' element={<BlockRecords/>}/>
          <Route path='/admin/password' element={<UserPassword/>}/>
          <Route path='/admin/prime' element={<PrimeUsers/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from 'react'
import { BrowserRouter as Router,Route, Routes }
    from 'react-router-dom';
import './App.css';
import Create from './components/CRUD/Create';
import Edit from './components/CRUD/Edit';
import Home from './components/CRUD/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Registration/register';
import Login from './components/Login/login';
import SendEmails from './components/SendEmails/SendEmails';
  
function App() {
  return (
    <div className='App'>
  
     <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit' element={<Edit/>}/>
        <Route path='/email' element={<SendEmails/>}/>
      </Routes>
    </Router>
  </div>
);
  
}
  
export default App;
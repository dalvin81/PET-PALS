import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Profile from './Components/Profile';
import FindNearby from './Components/findnearby'
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './Components/CreatePost';
import React, {createContext, useState} from 'react';
import { LoginContext  } from './Context/loginContext';
import Modal from './Components/Modal';

function App() {
  const [userLogin, setUserLogin] = useState(false)
  const [modalStart, setModalStart] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin, setModalStart}}>
          <Navbar login={userLogin}/>
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/signup" element={<SignUp/>}></Route>
              <Route path="/signin" element={<SignIn/>}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
              <Route path="/create" element={<CreatePost/>}></Route>
              <Route path="/find-nearby" element={<FindNearby/>}></Route>
            </Routes>
        <ToastContainer />
        {modalStart && <Modal setModalStart={setModalStart}></Modal> }
        </LoginContext.Provider>
        
      </div>
    
    </BrowserRouter>
    
  );
}

export default App;

import React, {useContext} from 'react'
import logo from "../img/logo.png";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../Context/loginContext';

export default function Navbar({login}) {
  const {setModalStart} = useContext(LoginContext)
  const loginStatus = () => {
    const token = localStorage.getItem("jwt")
    if(login || token){
      return [
        <>
        <Link to="/">
            <li>Home</li>
        </Link>
        <Link to="/profile">
            <li>Profile</li>
        </Link>  
        <Link to="/create">
            <li>Create</li>
        </Link>
        <Link to="/find-nearby">
            <li>Find nearby</li>
        </Link>
        <Link to="/assist">
            <li>Assist</li>
        </Link>
        <Link to={""}>
          <button className='logout' onClick={() => setModalStart(true)}>Logout</button>
        </Link>
        </>
      ]
    } else {
      return [
        <>
        <Link to="/signup">
            <li>Sign up</li>
        </Link>
        <Link to="/signin">
            <li>Sign in</li> 
        </Link>
        </>
      ]
    }
  };


  return (
    <div className='navbar'>
        <img src={logo} alt="" />
        <ul className='nav-menu'>
            {loginStatus()}
        </ul>
    </div>
  )
}

import React, {useState} from 'react'
import icon from '../img/ico.png'
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast  } from 'react-toastify';

export default function SignUp() { 
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Toastify functions

    const notifyError = (msg) => toast.error(msg)
    const notifySuccess = (msg) => toast.success(msg)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const postData = () => {
        // checking valid email
        if(!emailRegex.test(email)) {
            notifyError("Invalid Email")
            return
        }

        // sending data to server
        fetch("https://x2b8lxm2lj.execute-api.us-east-2.amazonaws.com/signup", {
            method:"post",
            headers:{
                "Content-Type":'application/json',
            },
            body:JSON.stringify({
                name:name,
                userName:userName,
                email:email,
                password:password
            })
        }).then(res=>res.json())
        .then(data => {
            if(data.error) {
                notifyError(data.error)
            } else {
                notifySuccess(data.message)
                navigate("/signin")
            }
            console.log(data)})
    }


    
  return (
    <div className='signUp'>
        <div className='form-container'>
            <div className='form'>
               <img className='signUpLogo' src={icon} alt=""/>
            <p className='loginIntro'>
                Sign up to explore
            </p>
            <div>
                <input type='email' name='email' id='email' value={email} placeholder='Email' onChange={(e) => {setEmail(e.target.value)}} />
            </div>
            <div>
                <input type='text' name='name' id='name' value={name} placeholder='Full Name' onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div>
                <input type='text' name='username' id='username' value={userName} placeholder='Username' onChange={(e) => {setUserName(e.target.value)}} />
            </div>
            <div>
                <input type='password' name='password' id='password' value={password} placeholder='Password' onChange={(e) => {setPassword(e.target.value)}} />
            </div>
            <input type='submit' id='submit-btn' value="Sign Up" onClick={() => { postData() }}/> 
            </div>
            <div className='form2'>
                Already have an account ?
                <Link to="/signin">
                    <span style={{color:'blue',cursor:'pointer'}}>Sign In</span>
                </Link>
                
                </div> 
        </div>
    </div>
  )
}

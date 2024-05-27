import React, {useState, useContext} from 'react'
import logo from '../img/logo.png'
import './SignIn.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginContext } from '../Context/loginContext'

export default function SignIn() {
    const {setUserLogin} = useContext(LoginContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
    fetch("https://x2b8lxm2lj.execute-api.us-east-2.amazonaws.com/signin", {
        method:"post",
        headers:{
            "Content-Type":'application/json',
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    }).then(res=>res.json())
    .then(data => {
        if(data.error) {
            notifyError(data.error)
        } else {
            notifySuccess("Sign in successful")
            setUserLogin(true)
            console.log(data)
            localStorage.setItem("jwt",data)
            navigate("/")
        }
        })
}


  return (
    <div className='signIn'>
        <div>
            <div className='loginForm'>
            <img className='signInLogo' src={logo} alt=""/>
            <div>
                <input type='email' name='email' id='email' value={email} placeholder='Email' onChange={(e) => {setEmail(e.target.value)}} />
            </div>
            <div>
                <input type='password' name='password' id='password' value={password} placeholder='Password' onChange={(e) => {setPassword(e.target.value)}} />
            </div>
            <div>
                <input type='submit' id='login-btn' onClick={() => postData()} value='Sign in'/>
            </div>
            </div>
            <div className='loginForm2'>
                Don't have an account?
                <Link to='/signup'>
                  <span style={{color:'blue', cursor:'pointer'}}>Sign up</span>   
                </Link>
            </div>
        </div>
    </div>
  )
}

import React, { useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const route = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value })
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      const response = await axios.post("http://localhost:7000/login", { loginData });
      if (response.data.success) {
        // const userData = response.data.userData;
        // const token = response.data.token;
        // Login(userData, token)
        setLoginData({ username: "", password: "" })
        route('/')
        toast.success(response.data.message)
        if(response.data.token){
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('UserId',response.data.userId)
        }
      } else {
        toast.error(response.data.message)
      }
    } else {
      toast.error("All fields are mandtory.")
    }
  }
  return (
    <div>
      <Header/>
      Login
      <br />
      UserName
      <input
        type='text'
        name='username'
        onChange={handleChange} /><br />
      Password
      <input
        type='password'
        name='password'
        onChange={handleChange} />
      <br />
      <button onClick={handleLogin}>Login</button>
      <Link to="/signup">Signup</Link>
    </div>
  )
}

export default Login
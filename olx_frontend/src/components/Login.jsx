import React, { useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import api from './Config/API'

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const route = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      const response = await api.post("/login", { loginData });
      if (response.data.success) {
        // const userData = response.data.userData;
        // const token = response.data.token;
        // Login(userData, token)
        setLoginData({ email: "", password: "" })
        route('/')
        toast.success(response.data.message)
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('UserId', response.data.userId)
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
      <Header />
      <div className='p-3 m-3'>
        <h4 className='text-center'>Welcome To Login Page</h4>
        <br />
        Email
        <input
          type='email'
          name='email'
          onChange={handleChange} 
          className='form-control'/><br />
        Password
        <input
          type='password'
          name='password'
          onChange={handleChange} 
          className='form-control'/>
        <br />
        <button className='btn btn-primary' onClick={handleLogin}>Login</button>
        <Link className='m-3' to="/signup">Signup</Link>
      </div>
    </div>
  )
}

export default Login
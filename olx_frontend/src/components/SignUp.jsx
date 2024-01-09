import React, { useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const SignUp = () => {
    const [userData, setUserData] = useState({ username: '', password: '', Confirmpassword: '' });
    const route = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value })
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        if (userData.username && userData.password && userData.Confirmpassword) {
            if (userData.password === userData.Confirmpassword) {
                const response = await axios.post("http://localhost:7000/signup", { userData })
                if (response.data.success) {
                    setUserData({ username: '', password: '', Confirmpassword: '' })
                    route('/login')
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            } else {
                toast.error("Password Does not Matched")
            }
        } else {
            toast.error("All Firlds are Mandatory")
        }
        //     console.log({ username, password })
        // const url = "http://localhost:7000/signup";
        // const data = { username, password }
        // axios.post(url, data)
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }
    return (
        <div>
            {/* <Header /> */}
            UserName
            <input
                type='text'
                name='username'
                onChange={handleChange} /><br />
            Password
            <input
                type='password'
                name='password'
                onChange={handleChange} /><br />
            Confirm Password
            <input
                type='password'
                name='Confirmpassword'
                onChange={handleChange} />
            <br />
            <button onClick={handleSignup}>SignUp</button>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default SignUp
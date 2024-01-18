// import axios from 'axios'

// // const token = JSON.parse(localStorage.getItem("token"))

// const api = axios.create({
//     baseURL: 'http://localhost:7000/',
//     // baseURL:'https://myntra-3s3b.onrender.com'
//     // headers:{'Authorization':`Bearer ${token}`}
// })

// export default api

const api = process.env.NODE_ENV != 'development' ?
    process.env.REACT_APP_BASE_URL :
    // 'http://localhost:7000'
    'https://becchoapp.onrender.com'

console.log(process.env, "API_URL");

export default api;
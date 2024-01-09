import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Categories from './Categories'
import { FaHeart } from "react-icons/fa";

const Home = () => {
    const route = useNavigate();
    const [products, setProducts] = useState([]);
    const [cproducts, setCproducts] = useState([]);
    const [search, setSearch] = useState('');

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         route('/login')
    //     }
    // }, [])

    useEffect(() => {
        const url = 'http://localhost:7000/get-Product'
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setProducts(res.data.product)
                }
            })
            .catch((err) => {
                toast.error('Server Error')
            })
    }, [])



    const handlesearch = (value) => {
        setSearch(value)
    }
    const handleClick = () => {
        let filteredProduct = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) || item.pcate.toLowerCase().includes(search.toLowerCase()) || item.pdesc.toLowerCase().includes(search.toLowerCase())) {
                return item
            }
        })
        setCproducts(filteredProduct)
    }

    const handleCate = (value) => {
        let filteredProduct = products.filter((item) => {
            if (item.pcate == value) {
                return item
            }
        })
        setCproducts(filteredProduct)
    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('UserId')
        const data = { userId, productId }
        const url = 'http://localhost:7000/like-Product'
        axios.post(url, data)
            .then((res) => {
                if(res.data.message){
                    toast.success(res.data.message)
                    // route('/like-Product ')
                }
            })
            .catch((err) => {
                toast.error('Server Error')
            })
    }

    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCate={handleCate} />


            <h3>Search Result:</h3>
            <div className='d-flex justify-content-center flex-wrap'>
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div className='card m-3' key={item._id}>
                                <div onClick={() => handleLike(item._id)} className='icon-con'>
                                    <FaHeart className='icons' />
                                </div>
                                <img width="300px" height="200px" src={'http://localhost:7000/' + item.pimage} />
                                <p className='m-2'>{item.pname} | {item.pcate}</p>
                                <h3 className='m-2 text-danger'>{item.pprice}</h3>
                                <p className='m-2 text-success'>{item.pdesc}</p>
                            </div>
                        )
                    })}
            </div>


            <h2>My Products : </h2>
            <div className='d-flex justify-content-center flex-wrap'>
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        return (
                            <div className='card m-3' key={item._id}>
                                <div onClick={() => handleLike(item._id)} className='icon-con'>
                                    <FaHeart className='icons' />
                                </div>
                                <img width="300px" height="200px" src={'http://localhost:7000/' + item.pimage} />
                                <p className='m-2'>{item.pname} | {item.pcate}</p>
                                <h3 className='m-2 text-danger'>{item.pprice}</h3>
                                <p className='m-2 text-success'>{item.pdesc}</p>
                            </div>
                        )
                    })}
            </div>

        </div>
    )
}

export default Home
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import Header from './Header';
import Carousel from 'react-bootstrap/Carousel'
import api from './Config/API';

const ProductDetail = () => {

  const [product, setProduct] = useState()
  const [user, setUser] = useState()
  const p = useParams()

  useEffect(() => {
    const url =api+'/product-detail/' + p.id
    axios.get(url)
      .then((res) => {
        if (res.data.product) {
          setProduct(res.data.product)
        }
      })
      .catch((err) => {
        toast.error('Server Error')
      })
  }, [])


  const handleContact = (addedBy) => {
    console.log("id", addedBy)

    const url = api+'/user-detail/' + addedBy
    axios.get(url)
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user)
        }
      })
      .catch((err) => {
        toast.error('Server Error')
      })
  }
  return (
    <div>
      <Header />
      Product Details:
      <div>
        {product &&
          <div className='d-flex justify-content-between flex-wrap'>
            <div>
              {/* <img width="700px" height="550px" src={'http://localhost:7000/' + product.pimage} alt='' />
              <img width="700px" height="550px" src={'http://localhost:7000/' + product.pimage2} alt='' /> */}
              <Carousel>
                <Carousel.Item>
                  <img width="750px" height="550px" src={api+'/' + product.pimage} alt='' />
                </Carousel.Item>
                <Carousel.Item>
                  <img width="750px" height="550px" src={api+'/' + product.pimage2} alt='' />
                </Carousel.Item>

              </Carousel>










              <h6>Product Details : </h6>
              {product.pdesc}
            </div>
            <div>
              <h3 className='m-2 price-text'>{product.pprice}</h3>
              <p className='m-2'>{product.pname} | {product.pcate}</p>
              <p className='m-2 text-success'>{product.pdesc}</p>
              {product.addedBy &&
                <button onClick={() => handleContact(product.addedBy)}>SHOW CONTACT</button>
              }
              {user && user.username &&
                <>
                  <h4>{user.username}</h4>
                  <h3>{user.mobile}</h3>
                  <h4>{user.email}</h4>
                </>

              }
            </div>
          </div>}
      </div>
    </div>
  )
}

export default ProductDetail
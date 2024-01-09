import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'

const Header = (props) => {
  const route = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    route('/login')
  }
  const handleClick = () => {

  }
  return (
    <div className='header-container d-flex justify-content-between'>
      <div className='header'>
        <Link to="/" className='links'>Home</Link>
        <input type='text' className='search'
          value={props && props.search}
          onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)} />
        <button className='search-btn' onClick={() => props.handleClick && props.handleClick()}>SEARCH</button>
        {/* <span className='mt-3'> Sell And spanurchase...In Your City</span> */}



      </div>
      <div>

        {localStorage.getItem('token') &&
          <Link to='/add-Product'>
            <button className='logout-btn'>Add Product</button>
          </Link>}
        {!localStorage.getItem('token') ?
          <Link to="login"> LOGIN </Link> :
          <button onClick={handleLogout} className='logout-btn'>LOGOUT </button>}
      </div>
    </div>
  )
}

export default Header
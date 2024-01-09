import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddProduct from './components/AddProduct';
import LikedProducts from './components/LikedProducts';

function App() {

  

  const handleClick=()=>{
    console.log("Clicked")
  }
  return (
    <div>
      
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/add-Product' element={<AddProduct />} />
        <Route exact path='/like-Product' element={<LikedProducts/>}/>
      </Routes>

    </div>
  );
}

export default App;

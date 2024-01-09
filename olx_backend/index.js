// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const bodyParser = require('body-parser')
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path'
// import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Login, SignUp } from './Controllers/UserController.js';
import { AddProduct, Get_Liked_Product, Get_Product, Liked_Product } from './Controllers/ProductController.js';

const app = express()
app.use(express.json())
dotenv.config();
app.use(cors())
app.use('/uploads',express.static(path.join('uploads')))
app.get('/', (req, res) => {
    res.send("Hello World")
})

// File Upload 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

// Request 
app.post("/signup",SignUp)
app.post("/login",Login)
app.post("/add-Product",upload.single('pimage'),AddProduct)
app.get('/get-Product',Get_Product)
app.post('/like-Product',Liked_Product)
app.get('/liked-product',Get_Liked_Product)
// Port Setting
app.listen(7000, () => {
    console.log(`Example app running om port no 7000`)
})

// DataBase Setting 
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Db Connected")
})
.catch((error)=>{
    console.log("Error while Connecting MongoDB",error)
})
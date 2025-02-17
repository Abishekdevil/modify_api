const express = require('express');
const { resolve } = require('path');
const Mongoose = require("mongoose")
const User = require("./schema")
require("dotenv").config()

const app = express();
const port = 3110;

app.use(express.static('static'));
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

const uri = process.env.uri;
Mongoose.connect(uri)
.then(()=>{
  console.log("Database Connected Successfully.")
})
.catch((err)=>{
  console.log("Server Error:",err)
})

// app.post("/menu", (req, res)=>{
//   const {name, description, price} = req.body;
//   if (!name || !description || !price){
//     res.status(400).json({Error: "All fields are required."})
//   }
//   res.status(201).json({
//     Message: "Menu created successfully !"
//   })
// })

app.post("/menu", async (req, res)=>{
  try{
    const {name, description, price} = req.body;

    if(!name || !description || !price){
      res.status(400).json({
        Error: "All fields are required"
      })
    }

    const newData = new User({
      name,
      description,
      price
    })
    await newData.save()

    res.status(201).json({
      Message: "Data created"
    })
  }
  catch{
    res.status(500).json({
      Error: "Internal Server Error"
    })
  }
  
})


app.get("/menu", async (req, res)=>{
  try{
    const userData = await User.find();
    res.status(200).json({
      Data: userData
    })
  }
  catch{
    res.status(500).json({
      Error: "Internal Server Error"
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
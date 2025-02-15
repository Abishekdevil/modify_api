const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());


const MONGO_URI = process.env.uri;
mongoose.connect(MONGO_URI)
.then(()=> console.log("Database connected successfully"))
.catch((err)=>{
    console.log("Error found:",err)
})



const menuItemSchema = new mongoose.Schema({
  name:
   { type: String,
     required: true 
    },
  description:
   { type: String 
  },
  price: 
  { type: Number, 
    required: true },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);


app.post("/menu", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ error: "Name and price are required." });
    }

    const newItem = new MenuItem({ name, description, price });
    await newItem.save();
    res.status(201).json({ message: "Menu item added successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ error: "Server error, could not add item" });
  }
});


app.get("/menu", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Server error, could not retrieve menu" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Meal } from "./models/meals.js"; // Import the Meal model
import { Order } from "./models/orders.js"; // Import the Order model
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Now you can import the variables
const { PORT, MONGO_URI } = process.env;

// Use PORT and MONGO_URI as needed in your module

const app = express();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
  console.log("Database connected");
});

app.use(cors());
app.use(express.json());

// Define a route to retrieve all meals
app.get("/meals", async (req, res) => {
  try {
    // Query the database to retrieve all meal documents
    const meals = await Meal.find({});
    res.json(meals);
  } catch (err) {
    console.error("Error fetching meals:", err);
    res.status(500).json({ error: "Unable to fetch meals" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const orderData = req.body;
    
    // Validate the required fields
    if (!orderData.user || !orderData.user.name || !orderData.user.street || !orderData.user.postal || !orderData.user.city || !orderData.orderedItems || orderData.orderedItems.length === 0) {
      res.status(400).json({ error: "Please fill all the required fields" });
      return;
    }

    console.log("Received order data:", orderData);

    // Extract the user and orderedItems data
    const { user, orderedItems } = orderData;

    // Create a new order instance
    const order = new Order({
      user: {
        name: user.name,
        street: user.street,
        postal: user.postal,
        city: user.city,
      },
      orderedItems: orderedItems,
    });

    // Log the order before saving
    console.log("Order to be saved:", order);

    // Attempt to save the order
    await order.save();

    // If successful, respond with the created order
    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Unable to create order" });
  }
});

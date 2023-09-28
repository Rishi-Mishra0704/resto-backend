import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import { DB_URL, PORT } from "./config.js";
import { Meal } from "./models/meals.js"; // Import the Meal model
import { Order } from "./models/orders.js"; // Import the Order model

const app = express();

mongoose
  .connect(DB_URL, {
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

app.post(
  "/orders",
  [
    // Validate user data fields
    body("user.name").notEmpty(),
    body("user.street").notEmpty(),
    body("user.postal").notEmpty().isLength({ min: 6 }),
    body("user.city").notEmpty(),
  ],
  async (req, res) => {
    try {
      const orderData = req.body; // Assuming the order data is sent in the request body
      const order = new Order(orderData);
      await order.save();
      res.status(201).json(order); // Respond with the created order
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ error: "Unable to create order" });
    }
  }
);

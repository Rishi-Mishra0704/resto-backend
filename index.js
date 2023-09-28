import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { DB_URL, PORT } from './config.js';
import { Meal } from './models/meals.js'; // Import the Meal model

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
app.get('/meals', async (req, res) => {
  try {
    // Query the database to retrieve all meal documents
    const meals = await Meal.find({});
    res.json(meals);
  } catch (err) {
    console.error("Error fetching meals:", err);
    res.status(500).json({ error: "Unable to fetch meals" });
  }
});


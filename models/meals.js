import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    meals: {
      m1: {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
      m2: {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
      m3: {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
      m4: {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
      m5: {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model("Meal", mealSchema);

// Creating meal documents
const mealsData = {
  meals: {
    m1: {
      name: "Sushi",
      description: "Finest fish and veggies",
      price: 29.99,
    },
    m2: {
      name: "Schnitzel",
      description: "A German specialty!",
      price: 16.99,
    },
    m3: {
      name: "Hamburger",
      description: "American, raw, meaty",
      price: 17.99,
    },
    m4: {
      name: "Samosa",
      description: "An Indian Snack. Quick and filling",
      price: 2.99,
    },
    m5: {
      name: "Momos",
      description: "An all-loving dish from Nepal",
      price: 7.99,
    },
  },
};
// Inserting meal documents
// Check if any meal documents exist in the database
Meal.countDocuments()
  .then((count) => {
    if (count === 0) {
      // If no meal documents exist, insert the data
      return Meal.create(mealsData);
    }
  })
  .then(() => {
    console.log("Meal data inserted successfully");
  })
  .catch((err) => {
    console.error("Error inserting meal data:", err);
  });

export { Meal };

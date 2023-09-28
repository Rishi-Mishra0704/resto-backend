import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderedItems: [
      {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      name: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postal: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export { Order };

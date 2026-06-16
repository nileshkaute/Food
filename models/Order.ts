import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  foodItem: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IUserDetails {
  name: string;
  email: string;
  phone: string;
}

export interface IOrder extends Document {
  userDetails: IUserDetails;
  items: IOrderItem[];
  totalPrice: number;
  paymentStatus: "Pending" | "Paid" | "Failed";
  deliveryAddress: string;
  orderStatus: "Pending" | "Preparing" | "Out for Delivery" | "Delivered";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userDetails: {
      name: {
        type: String,
        required: [true, "Please provide user name"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Please provide user email"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please provide a valid email address",
        ],
      },
      phone: {
        type: String,
        required: [true, "Please provide user phone number"],
      },
    },
    items: [
      {
        foodItem: {
          type: Schema.Types.ObjectId,
          ref: "Food",
          required: [true, "Please provide a food item reference"],
        },
        quantity: {
          type: Number,
          required: [true, "Please provide item quantity"],
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Please provide total price"],
      min: [0, "Total price must be positive"],
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    deliveryAddress: {
      type: String,
      required: [true, "Please provide delivery address"],
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Preparing", "Out for Delivery", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure model compilation works well with serverless architecture hot-reloads
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;

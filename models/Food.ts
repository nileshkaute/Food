import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFood extends Document {
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  ratings: number;
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FoodSchema = new Schema<IFood>(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the food item"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide the price of the food item"],
      min: [0, "Price must be a positive number"],
    },
    image: {
      type: String,
      required: [true, "Please provide the image URL path"],
    },
    category: {
      type: String,
      required: [true, "Please specify a category (e.g., Dim Sum, Szechuan, Noodles)"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    ratings: {
      type: Number,
      default: 5.0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure model compilation works well with serverless architecture hot-reloads
const Food: Model<IFood> = mongoose.models.Food || mongoose.model<IFood>("Food", FoodSchema);

export default Food;

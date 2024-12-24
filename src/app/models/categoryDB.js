import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true },
});
const Category =
  mongoose.models.Categories || mongoose.model("Categories", categorySchema);

export default Category;

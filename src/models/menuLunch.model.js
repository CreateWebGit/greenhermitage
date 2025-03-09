import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  _id: {
    type: Number,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  opening_hours: {
    start: { type: Number, required: false, default: 0 },
    end: { type: Number, required: false, default: 0 },
  },
});

// prettier-ignore
const MenuLunch = models.menuLunch || mongoose.model("menuLunch", userSchema);
export default MenuLunch;

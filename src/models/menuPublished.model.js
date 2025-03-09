import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  _id: {
    type: Number,
    default: 1,
  },
  published: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// prettier-ignore
const MenuPublished = models.menuPublished || mongoose.model("menuPublished", userSchema);
export default MenuPublished;

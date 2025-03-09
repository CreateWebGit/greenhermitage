import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
    adminComment: {
      type: String,
      required: false,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleDateString("sv-SE"), // getter
    },
    highlights: {
      type: Boolean,
      require: false,
      default: false,
    },
    expanded: {
      type: Boolean,
      require: false,
      default: false,
    },
  },

  { timestamps: true }
);

const Ratings = models.Ratings || mongoose.model("Ratings", userSchema);
export default Ratings;

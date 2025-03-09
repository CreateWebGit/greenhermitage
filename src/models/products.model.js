import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  products: [
    {
      _id: {
        type: String,
        required: false,
      },
      categoryID: {
        type: String,
        required: false,
      },
      categoryName: {
        type: String,
        required: false,
      },
      expanded: {
        type: Boolean,
        required: false,
      },
      products: [
        {
          _id: {
            type: String,
            require: false,
          },
          expanded: {
            type: Boolean,
            required: false,
          },
          title: {
            type: String,
            require: false,
          },
          description: {
            type: String,
            require: false,
          },
          price: {
            type: String,
            require: false,
          },
          vegan: {
            type: Boolean,
            require: false,
            default: false,
          },
        },
      ],
    },
  ],
});

const Products = models.Products || mongoose.model("Products", userSchema);
export default Products;

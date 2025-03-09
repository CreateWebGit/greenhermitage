import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: false,
    },
    about: {
      company: {
        type: String,
        required: false,
      },
      shortDescription: {
        type: String,
        required: false,
      },
      longDescription: {
        type: String,
        required: false,
      },
      img: {
        type: String,
        required: false,
      },
    },
    productsList: [
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
    stuff: [
      {
        _id: {
          type: String,
          required: false,
        },
        img: {
          type: String,
          required: false,
        },
        name: {
          type: String,
          required: false,
        },
        speciality: [
          {
            type: String,
            required: false,
          },
        ],
        despcription: {
          type: String,
          required: false,
        },
      },
    ],
    contacts: {
      companyEmail: {
        type: String,
        required: false,
      },
      phone: {
        type: String,
        required: false,
      },
      weburl: {
        type: String,
        required: false,
      },
      address: {
        streetAddress: {
          type: String,
          required: false,
        },
        streetNumber: {
          type: String,
          required: false,
        },
        zipCode: {
          type: String,
          required: false,
        },
        postalAddress: {
          type: String,
          required: false,
        },
      },
    },

    opening_hours: {
      monday: {
        start: { type: Number, required: false, default: 0 },
        end: { type: Number, required: false, default: 0 },
        close: { type: Boolean, required: false, default: false },
      },
      tuesday: {
        start: { type: Number, required: false, default: 0 },
        end: { type: Number, required: false, default: 0 },
        close: { type: Boolean, required: false, default: false },
      },
      wednesday: {
        start: { type: Number, required: false, default: 0 },
        end: { type: Number, required: false, default: 0 },
        close: { type: Boolean, required: false, default: false },
      },
      thursday: {
        start: { type: Number, required: false, default: 0 },
        end: { type: Number, required: false, default: 0 },
        close: { type: Boolean, required: false, default: false },
      },
      friday: {
        start: { type: Number, required: false, default: 0 },
        end: { type: Number, required: false, default: 0 },
        close: { type: Boolean, required: false, default: false },
      },
      saturday: {
        start: { type: Number, required: false, default: 0 },
        end: { type: Number, required: false, default: 0 },
        close: { type: Boolean, required: false, default: false },
      },
      sunday: {
        start: { type: Number, required: false, default: 0 },
        end: { type: Number, required: false, default: 0 },
        close: { type: Boolean, required: false, default: false },
      },
    },
  },
  { timestamps: true }
);

const Profile = models.Profile || mongoose.model("Profile", userSchema);
export default Profile;

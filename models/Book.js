const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    title_1: {
      type: String,
    },
    title_2: {
      type: String,
    },
    title_3: {
      type: String,
    },
    title_4: {
      type: String,
    },
    title_5: {
      type: String,
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    description: {
      type:String,
      required:true,
    },
    description_1: {
      type:String,
      required:false,
    },
    description_2: {
      type:String,
      required:false,
    },
    description_3: {
      type:String,
      required:false,
    },
    description_4: {
      type:String,
      required:false,
    },
    description_5: {
      type:String,
      required:false,
    },

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("News", NewsSchema);

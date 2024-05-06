import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createDt: {
      type: String,
      required: false,
    },
    updateDt: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageDesc: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);

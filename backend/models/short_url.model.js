import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({

  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
    index: true,// helps fast searching document in mongodb by indexing by creating a b-tree(not seching juts get it by index)
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const shortUrl = mongoose.model("shortUrl", shortUrlSchema);

export default shortUrl;

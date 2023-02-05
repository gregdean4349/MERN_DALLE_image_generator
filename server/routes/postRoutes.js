import { v2 as cloudinary } from "cloudinary"
import * as dotenv from "dotenv"
import express from "express"

import Post from "../mongodb/models/post.js"

dotenv.config()

const router = express.Router()

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// CREATE POST
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body

    // UPLOAD PHOTO TO CLOUDINARY
    const photoUrl = await cloudinary.uploader.upload(photo)

    // POST TO MONGODB
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    })

    res.status(200).json({ success: true, data: newPost })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    })
  }
})

// FETCH POSTS FROM MONGODB
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json({ success: true, data: posts })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    })
  }
})

export default router


const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
   subject: { type: String },
   body: { type: String },
   user: { type: String, required: true },
   email: { type: String, required: true },
   name: { type: String, required: true },
   contact: { type: String, required: true },
   unit: { type: String, required: true },
   completed: { type: Boolean, default: false }, // Added completed field with default value false
   comments: [{
      // an id referencing the comment
      type: mongoose.Types.ObjectId,
      // search for it in the Comments collection
      ref: 'Comment'
   }]
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

module.exports = Post
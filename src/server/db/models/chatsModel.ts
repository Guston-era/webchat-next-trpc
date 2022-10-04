import mongoose from 'mongoose'

const chatsSchema = new mongoose.Schema(
  {
    title: String,
  },
  { timestamps: true },
)

let mod: typeof mongoose.Model
try {
  mod = mongoose.model('chats', chatsSchema)
} catch (e) {
  mod = mongoose.model('chats')
}

export const ChatsModel = mod

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
});

const User = mongoose.model("usernames", userSchema);

export default User;

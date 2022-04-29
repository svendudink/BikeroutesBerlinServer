import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("usernames", userSchema);

export default User;

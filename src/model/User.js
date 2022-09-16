import { ObjectId, ObjectID } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  college: {
    type: String,
    default: "none",
  },
  collegeId: {
    type: ObjectId,
    default: null,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

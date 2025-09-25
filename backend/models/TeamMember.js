import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  bio: { type: String, required: true },
  skills: { type: [String], required: true },
  image: { type: String, required: true },
  email: { type: String },
  linkedin: { type: String },
}, { timestamps: true });

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);
export default TeamMember;

import TeamMember from "../models/TeamMember.js";

// GET all team members
export const getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD team member
export const addTeamMember = async (req, res) => {
  try {
    const newMember = new TeamMember(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE team member
export const updateTeamMember = async (req, res) => {
  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE team member
export const deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: "Team member deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

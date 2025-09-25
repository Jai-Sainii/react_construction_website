import Service from "../models/Service.js";

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new service
export const addService = async (req, res) => {
  try {
    const { title, description, price, features } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    const newService = new Service({ title, description, price, features });
    await newService.save();

    res.status(201).json({ message: "Service added successfully", service: newService });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

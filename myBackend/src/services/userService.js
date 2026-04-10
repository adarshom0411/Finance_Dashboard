const User = require("../models/User");

exports.getUsers = async () => {
  return await User.find().select("-password");
};

exports.createUser = async (data) => {
  return await User.create(data);
};

exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
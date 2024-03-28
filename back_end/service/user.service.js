const User = require("../model/user");
const fs = require("fs");
const { register } = require("./auth.service");
const CryptoJS = require("crypto-js");

const getAllUser = async () => {

  //const admin = await User.find({ role: process.env.ADMIN });

  const qaManager = await User.find({ role: process.env.MARKETINGMANAGER })
    .sort([["createdAt", "asc"]])

  const qaCoordiator = await User.find({ role: process.env.MARKETINGCOORDINATOR })
    .sort([["createdAt", "asc"]])

  const userDb = await User.find({ role: process.env.STUDENT })
    .sort([["createdAt", "asc"]])

  return [...qaManager, ...qaCoordiator, ...userDb];
};

const getUserByUsername = async (username) => {
   const qaManager = await User.findOne({
     role: process.env.MARKETINGMANAGER,
     fullname: new RegExp(username, "i"),
   });
  const listUserInDb = await User.find({role: process.env.STUDENT, fullname: new RegExp(username, 'i')})
    .sort([["createdAt", "asc"]])
    if(qaManager) {
      return [qaManager, ...listUserInDb]
    }
    return listUserInDb;
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, updateAccount) => {
  console.log("putt" + updateAccount);
  const {
    password,
    confirmPassword,
    fullname,
    dateOfBirth,
    address,
    age,
    gender,
    role,
    avatar,
  } = updateAccount;
  if (password !== confirmPassword) {
    throw new Error("Password and confirm password is not match");
  } else {
    try {
      var encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.ENCRYPT_KEY
      ).toString();

      await User.findByIdAndUpdate(id, {
        fullname: fullname,
        dateOfBirth: dateOfBirth,
        address: address,
        age: age,
        gender: gender,
        avatar: avatar,
        role: role,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        console.log(errors);

        throw new Error(errors);
      }
    }
  }
};

const deleteUser = async (id) => {
  console.log("delete" + id);
  await User.deleteOne({ _id: id });
};

const reactiveUser = async (id) => {
  await User.findByIdAndUpdate(id, {deleted: false});
}

const findStaffWithoutDepartment = async () => {
  const listUserInDb = await User.find({
    department: "",
    role: [process.env.STUDENT, process.env.MARKETINGMANAGER],
  });
  return listUserInDb;
};


module.exports = {
  getAllUser,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
  reactiveUser,
  findStaffWithoutDepartment
};

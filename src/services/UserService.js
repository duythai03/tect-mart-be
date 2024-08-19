const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = newUser;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "Email đã tồn tại",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      console.log("hash", hash);
      const createdUser = await User.create({
        email,
        password: hash,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Đăng ký thành công, quay lại trang đăng nhập",
          data: createdUser,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Tài khoản không xác định",
        });
      }
      const comparedPassword = bcrypt.compareSync(password, checkUser.password);
      console.log("comparedPassword", comparedPassword);
      if (!comparedPassword) {
        resolve({
          status: "ERR",
          message: "Sai mật khẩu",
        });
      }
      const access_token = await generalAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "Login successfully",
        access_token,
        refresh_token,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      console.log("checkUser", checkUser);
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }

      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
      console.log("updateUser", updateUser);

      resolve({
        status: "OK",
        message: "Update successfully",
        data: updateUser,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      console.log("checkUser", checkUser);
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete successfully",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "OK",
        message: "success",
        data: allUser,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: id });
      if (user === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "success",
        data: user,
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
};

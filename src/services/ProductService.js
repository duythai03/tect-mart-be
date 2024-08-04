const Product = require("../models/Product");
const bcrypt = require("bcrypt");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } =
      newProduct;
    try {
      const checkProduct = await Product.findOne({ name: name });
      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "The name of product is already",
        });
      }
      const newProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "Product is created successfully",
          data: newProduct,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      const updateProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      console.log("updateProduct", updateProduct);

      resolve({
        status: "OK",
        message: "Update successfully",
        data: updateProduct,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({ _id: id });
      if (product === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "success",
        data: product,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });
      console.log("checkProduct", checkProduct);
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete successfully",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getAllProduct = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    page = page - 1;
    try {
      const totalProduct = await Product.countDocuments();
      const allProduct = await Product.find()
        .limit(limit)
        .skip(limit * page);
      resolve({
        status: "OK",
        message: "success",
        data: allProduct,
        total: totalProduct,
        currentPage: page + 1,
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
};

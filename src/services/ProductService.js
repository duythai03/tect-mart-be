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

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    page = page - 1;
    try {
      const totalProduct = await Product.countDocuments();
      if (filter && filter.length === 2) {
        console.log("filter condition met");
        const allProductFilter = await Product.find({
          [filter[0]]: { $regex: filter[1], $options: "i" },
        }).limit(1000);
        resolve({
          status: "OK",
          message: "success",
          data: allProductFilter,
          totalProductsEachPage: limit,
          currentPage: page + 1,
          totalProducts: totalProduct,
          totalPage: Math.ceil(totalProduct / limit),
        });
      } else if (sort && sort.length === 2) {
        console.log("Sort condition met");
        const objectSort = {};
        objectSort[sort[0]] = sort[1];
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(limit * page)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "success",
          data: allProductSort,
          totalProductsEachPage: limit,
          currentPage: page + 1,
          sort: objectSort,
          totalProducts: totalProduct,
          totalPage: Math.ceil(totalProduct / limit),
        });
      } else {
        console.log("else condition met");
        const allProduct = await Product.find()
          .limit(limit)
          .skip(limit * page);
        resolve({
          status: "OK",
          message: "success",
          data: allProduct,
          totalProductsEachPage: limit,
          currentPage: page + 1,
          totalProducts: totalProduct,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
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

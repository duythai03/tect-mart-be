const ProductService = require("../services/ProductService");
const JwtServices = require("../services/JwtService");

const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock, rating, description } =
      req.body;
    if (!name || !image || !type || !price || !countInStock || !rating) {
      return res.status(200).json({
        status: "ERR",
        message: "All fields are required",
      });
    }
    const result = await ProductService.createProduct(req.body);
    return res.status(201).json({
      message: result,
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const result = await ProductService.updateProduct(productId, data);
    return res.status(201).json({
      message: result,
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const result = await ProductService.deleteProduct(productId);
    return res.status(201).json({
      message: result,
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const result = await ProductService.getDetailsProduct(productId);
    return res.status(201).json({
      message: result,
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const result = await ProductService.getAllProduct(
      limit || 10,
      page || 1,
      sort,
      filter
    );
    return res.status(201).json({
      message: result,
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
};

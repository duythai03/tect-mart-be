const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create", productController.createProduct);
router.put("/update/:id", authMiddleware, productController.updateProduct);
router.get("/details/:id", productController.getDetailsProduct);
router.delete(
  "/delete-product/:id",
  authMiddleware,
  productController.deleteProduct
);
router.get("/get-all", productController.getAllProduct);

module.exports = router;

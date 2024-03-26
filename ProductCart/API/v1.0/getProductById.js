const express = require("express");
const mongoose = require("mongoose"); // Import mongoose module
const router = express.Router();
const ProductSchema = require("../../../ProductCart/Model/product");
const cors = require('cors');
router.use(cors());
router.get("/:id", async (req, res) => {
  try {
    const reqParams = req.params;
    const productId = reqParams.id;
    if (!mongoose.isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid product ID" });
    }
    const getProduct = await ProductSchema.findOne({ _id: productId });
    if (!getProduct) {
      return res
        .status(204)
        .json({ status: 204, message: "No product in database", data: [] });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Success", data: getProduct });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const ProductSchema = require("../../../ProductCart/Model/product");

router.delete("/:id", async (req, res) => {
  try {
    const reqParams = req.params;
    const productId = reqParams.id;
    const deletedProduct = await ProductSchema.findByIdAndDelete({ _id: productId });
    if (!deletedProduct) {
      return res
        .status(204)
        .json({ status: 204, message: "No product in database", data: [] });
    }
    return res
      .status(200)
      .json({ status: 200, message: " delete Success", data: deletedProduct });
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
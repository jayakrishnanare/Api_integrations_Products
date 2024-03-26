const express = require("express");
const router = express.Router();
const ProductSchema = require("../../../ProductCart/Model/product");
const cors = require('cors');
router.use(cors());
router.get("/", async (req, res) => {
  try {
    const getAllProducts = await ProductSchema.find({});
    if (getAllProducts.length === 0) {
      return res.status(204).json({ status: 204, message: "no data in db", getAllProducts : [] });
    }
    return res
      .status(200)
      .json({
        status: 200,
        message: "sucess",
        count: getAllProducts.length,
        data: getAllProducts,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "internal server error", error : error });
  }
});

module.exports = router;

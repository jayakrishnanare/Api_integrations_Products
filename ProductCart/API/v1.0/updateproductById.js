const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const ProductSchema = require("../../../ProductCart/Model/product");

router.put("/:id", async (req, res) => {
  try {
    const reqBody = req.body;
    const reqParms = req.params;
    const updateDetails = {};
    if (req.get("Content-Type") != "application/json") {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid header format" });
    }
    if (reqBody.hasOwnProperty("name")) {
      if (reqBody.name.length > 0 && typeof reqBody.name === "string") {
        updateDetails.name = reqBody.name;
      } else {
        return res.status(400).json({ message: "provide a valid name" });
      }
    }
    if (reqBody.hasOwnProperty("brand")) {
      if (reqBody.brand.length > 0 && typeof reqBody.brand === "string") {
        updateDetails.brand = reqBody.brand;
      } else {
        return res.status(400).json({ message: "provide a valid brand" });
      }
    }
    if (reqBody.hasOwnProperty("colour")) {
      if (reqBody.colour.length > 0 && typeof reqBody.colour === "string") {
        updateDetails.colour = reqBody.colour;
      } else {
        return res.status(400).json({ message: "provide a valid colour" });
      }
    }
    if (reqBody.hasOwnProperty("price")) {
      if (reqBody.price !== undefined && typeof reqBody.price === "number") {
        updateDetails.price = reqBody.price;
      } else {
        return res.status(400).json({ message: "provide a valid price" });
      }
    }
    if (reqBody.hasOwnProperty("image")) {
      if (reqBody.image.length > 0 && typeof reqBody.image === "string") {
        updateDetails.image = reqBody.image;
      } else {
        return res.status(400).json({ message: "provide a valid image" });
      }
    }
    if (reqBody.hasOwnProperty("requirements")) {
      if (
        Array.isArray(reqBody.requirements) &&
        reqBody.requirements.length > 0
      ) {
        updateDetails.requirements = reqBody.requirements;
      } else {
        return res.status(400).json({ message: "provide a valid requirements" });
      }
    }
    if (reqBody.hasOwnProperty("category")) {
      if (reqBody.category.length > 0 && typeof reqBody.category === "string") {
        updateDetails.category = reqBody.category;
      } else {
        return res.status(400).json({ message: "provide a valid category" });
      }
    }
    if (reqBody.hasOwnProperty("quantity")) {
      if (reqBody.price !== undefined && typeof reqBody.quantity === "number") {
        updateDetails.quantity = reqBody.quantity;
      } else {
        return res.status(400).json({ message: "provide a valid quantity" });
      }
    }
    if (reqBody.hasOwnProperty("isReuired")) {
      if (
        reqBody.isReuired !== undefined &&
        typeof reqBody.isReuired === "boolean"
      ) {
        updateDetails.isReuired = reqBody.isReuired;
      } else {
        return res.status(400).json({ message: "provide a valid isReuired" });
      }
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (errors.isEmpty()) {
      const updateProduct = await ProductSchema.findOneAndUpdate(
        { _id: reqParms.id },
        updateDetails,
        { new: true }
      );
      if (!updateProduct) {
        return res
          .status(404)
          .json({ status: 404, message: "record not found" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "sucess", data: updateProduct });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "internal server error", error: error });
  }
});

module.exports = router;

const express = require('express')
const { body, validationResult } = require("express-validator");
const router = express.Router();
const ProductSchema = require('../../../ProductCart/Model/product')
const cors = require('cors');
router.use(cors());
router.post(
  "/",
  [
    body("name").isString().trim().notEmpty().withMessage("provide a name"),
    body("brand").isString().trim().notEmpty().withMessage("provide a brand"),
    body("colour").isString().trim().notEmpty().withMessage("provide a colour"),
    body("price").isNumeric().trim().notEmpty().withMessage("provide a price"),
    body("quantity")
      .isNumeric()
      .trim()
      .notEmpty()
      .withMessage("provide a quantity"),
  ],
  async (req, res) => {
    try {
        let reqbody = req.body
        if (req.get("Content-Type") != "application/json") {
            return res.status(400).json({ status: 400, message: 'Invalid header format' });
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array() })
        }
        if(errors.isEmpty()){
            const newProduct = new ProductSchema
            newProduct.name = reqbody.name;
            newProduct.brand = reqbody.brand;
            newProduct.colour = reqbody.colour;
            newProduct.price = reqbody.price;
            newProduct.image = reqbody.image;
            newProduct.requirements = reqbody.requirements;
            newProduct.category = reqbody.category;
            newProduct.quantity = reqbody.quantity;
            newProduct.isReuired = reqbody.isReuired;
            const results = await newProduct.save();
            console.log('results',results);
            return res.status(200).json({status : 200, message : "sucess", Data : results})
        }
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "internal server error", error: error });
    }
  }
);
module.exports = router;

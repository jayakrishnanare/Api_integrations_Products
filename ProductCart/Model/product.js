  const mongoose = require("mongoose");
  const autopopulate = require("mongoose-autopopulate");
  let ProductSchema = mongoose.Schema({
    name: { type: String, trim: true, minlength: 1, require: true },
    brand: { type: String, trim: true, require: true },
    colour: { type: String, trim: true, require: true },
    price: { type: Number, trim: true, require: true },
    image: { type: String, require: true },
    requirements : [{
      type : String
    }],
    category: { type: String, trim: true, require: true },
    quantity: { type: Number, trim: true, require: true },
    isReuired : {type : Boolean, default : true}
  },{versionKey : false});

  ProductSchema.plugin(autopopulate);
  var Product = mongoose.model('ProductSchema', ProductSchema);
  module.exports = Product ;
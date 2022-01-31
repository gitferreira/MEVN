import mongoose, { Schema } from "mongoose";

const saleSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "user", required: true },
  person: { type: Schema.ObjectId, ref: "person", required: true },
  receipt_type: { type: String, maxlength: 20, required: true },
  receipt_serie: { type: String, maxlength: 7 },
  receipt_num: { type: String, maxlength: 10, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  details: [
    {
      _id: { type: String, required: true },
      article: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      discount: {type: Number, required: true}
    },
  ],
  state: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Sale = mongoose.model("sale", saleSchema);

export default Sale;

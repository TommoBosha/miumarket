import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        productIndex: { type: String, required: true, unique: true, index: true },
        price: { type: Number, required: true },
        images: [{ type: String }],
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        properties: { type: Object },
        tag: { type: Object },
        countInStock: { type: Number, required: true },
        slug: { type: String, required: true },
        isFeatured: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
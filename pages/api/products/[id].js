import { mongooseConnect } from "../../../lib/mongoose";
import Product from "../../../models/Product";



const handler = async (req, res) => {
    await mongooseConnect()
    const product = await Product.findById(req.query.id);

    res.send(product);
};

export default handler;
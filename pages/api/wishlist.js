
import { getServerSession } from "next-auth";
import { mongooseConnect } from "../../lib/mongoose";
import { WishedProduct } from "../../models/WishedProduct";

export default async function handle(req, res) {
    await mongooseConnect();
    const { user } = await getServerSession(req, res);

    if (req.method === 'POST') {
        const { product } = req.body;
        const wishedDoc = await WishedProduct.findOne({ userEmail: user.email, product });
        if (wishedDoc) {
            await WishedProduct.findByIdAndDelete(wishedDoc._id);
            res.json({ wishedDoc }); // Повертаємо об'єкт wishedDoc
        } else {
            const newWishedDoc = await WishedProduct.create({ userEmail: user.email, product });
            res.json({ wishedDoc: newWishedDoc }); // Повертаємо об'єкт нового wishedDoc
        }
    }

    if (req.method === 'GET') {
        res.json(
            await WishedProduct.find({ userEmail: user.email }).populate('product')
        );
    }
}
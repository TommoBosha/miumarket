
import { getServerSession } from "next-auth";
import { mongooseConnect } from "../../lib/mongoose";
import { WishedProduct } from "../../models/WishedProduct";

export default async function handle(req, res) {
    await mongooseConnect();
    const session = await getServerSession(req, res);
    const user = session?.user || null; 

    if (req.method === 'POST') {
        const { product } = req.body;
        if (user) {
            const wishedDoc = await WishedProduct.findOne({ userEmail: user.email, product });
            if (wishedDoc) {
                await WishedProduct.findByIdAndDelete(wishedDoc._id);
                res.json({ wishedDoc });
            } else {
                const newWishedDoc = await WishedProduct.create({ userEmail: user.email, product });
                res.json({ wishedDoc: newWishedDoc });
            }
        } else {
            res.status(401).json({ error: "Користувач не авторизований" });
        }
    }

    if (req.method === 'GET') {
        if (user) {
            res.json(
                await WishedProduct.find({ userEmail: user.email }).populate('product')
            );
        } else {
            
            res.status(401).json({ error: "Користувач не авторизований" });
        }
    }

    if (req.method === 'DELETE') {
        if (user) {
            const { productId } = req.body;
            await WishedProduct.deleteOne({ userEmail: user.email, product: productId });
            res.status(200).json({ message: "Продукт видалено зі списку бажань" });
        } else {
            res.status(401).json({ error: "Користувач не авторизований" });
        }
    }
}
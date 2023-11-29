// import { mongooseConnect } from "../../../lib/mongoose";
// import Product from "../../../models/Product";



// const handler = async (req, res) => {
//     await mongooseConnect()
//     const product = await Product.findById(req.query.id);

//     res.send(product);
// };

// export default handler;

import { mongooseConnect } from "../../../lib/mongoose";
import Product from "../../../models/Product";

const handler = async (req, res) => {
    await mongooseConnect();

    if (req.method === 'GET') {
        // Отримання продукту за ідентифікатором
        const product = await Product.findById(req.query.id);
        res.send(product);
    } else if (req.method === 'PUT') {
        // Зміна кількості товару
        const { _id, countInStock } = req.body;

        try {
            if (_id && countInStock !== undefined) {
                await Product.updateOne(
                    { _id },
                    { countInStock }
                );
                res.status(200).json(true);
            } else {
                res.status(400).json({ error: 'Необхідно вказати ідентифікатор (_id) та нову кількість товару (countInStock).' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};

export default handler;
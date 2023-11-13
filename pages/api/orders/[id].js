import { getSession } from 'next-auth/react'
import { mongooseConnect } from '../../../lib/mongoose';
import Order from '../../../models/Order';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('потрібно увійти в обліковий запис');
    }

    await mongooseConnect();
    const order = await Order.findById(req.query.id);
    res.send(order);
}

export default handler;
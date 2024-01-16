import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const user = await getToken({ req });
    if (!user) {
      return res.status(401).send("signin required");
    }

    await db.connect();
    const newOrder = new Order({
      ...req.body,
      user: user.email,
      shippingAddress: {
        ...req.body.shippingAddress,
        deliveryMethod: req.body.shippingAddress.deliveryMethod,
      },
    });

    const order = await newOrder.save();
    res.status(201).send(order);
  } else if (req.method === "GET") {
    const session = await getServerSession(req, res);

    if (!session || !session.user || !session.user.email) {
      return res.status(401).send("signin required");
    }

    const orders = await Order.find({ user: session.user.email });

    res.json(orders);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};

export default handler;

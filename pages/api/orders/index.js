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

export const paymentWebhookHandler = async (req, res) => {
  if (req.method === "POST") {
    await db.connect();
    const { data } = req.body;
    // Розшифровка даних від LiqPay, перевірка підпису тощо. (залежить від платіжної системи)
    // Перевірка статусу оплати
    if (data.status === "success") {
      // Оновлення статусу замовлення на "успішно"
      const order = await Order.findByIdAndUpdate(data.order_id, { status: "успішно" }, { new: true });
      res.status(200).json(order);
    } else {
      // Обробка неуспішної оплати
      res.status(400).json({ message: "Оплата не пройшла" });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};



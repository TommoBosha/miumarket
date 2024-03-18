
import crypto from "crypto";
import Order from "../../models/Order";
import db from "../../utils/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { data, signature } = req.body;
    console.log("Отримано запит від LiqPay:", req.body);
    const privateKey = process.env.PRIVATE_LIQPAY_KEY;

    // Перевіряємо підпис
    const expectedSignature = crypto.createHash('sha1')
      .update(privateKey + data + privateKey)
      .digest('base64');

    if (signature !== expectedSignature) {
      return res.status(403).send("Невірний підпис");
    }

    const decodedData = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));

    await db.connect();
    const order = await Order.findOne({ _id: decodedData.order_id });

    if (!order) {
      return res.status(404).send("Замовлення не знайдено");
    }

    // Оновлюємо статус замовлення на основі відповіді LiqPay
    if (decodedData.status === "success") {
      order.isPaid = true;
      order.paidAt = Date.now();
    }
    // Тут можна додати обробку інших статусів

    await order.save();
    res.status(200).send("Статус оплати оновлено");
  } else {
    res.status(405).send("Method Not Allowed");
  }
};

export default handler;
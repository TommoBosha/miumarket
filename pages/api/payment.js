import axios from 'axios';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderData } = req.body; // Збирайте дані замовлення від клієнта

    const data = {
      public_key: process.env.PUBLIC_LIQPAY_KEY,
      version: 3,
      action: "pay",
      amount: orderData.totalPrice,
      currency: "UAH",
      description: "Опис замовлення",
      order_id: orderData.orderId,
      // Додайте інші необхідні поля
    };

    const dataString = Buffer.from(JSON.stringify(data)).toString('base64');

    const signatureString = process.env.PRIVATE_LIQPAY_KEY + dataString + process.env.PRIVATE_LIQPAY_KEY;
    const signature = crypto.createHash('sha1').update(signatureString).digest('base64');

    // Відправте дані на LiqPay
    try {
      const response = await axios.post('https://www.liqpay.ua/api/request', {
        data: dataString,
        signature: signature,
      });
console.log(response)
      // Опрацюйте відповідь від LiqPay
      res.status(200).json({ success: true, redirectUrl: response.data.checkout_url });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    // Обробіть випадок, коли запит не є POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
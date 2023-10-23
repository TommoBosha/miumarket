import LiqPay from "liqpay-sdk-nodejs";

const liqpay = new LiqPay({
    publicKey: 'sandbox_i67991022050',
    privateKey: 'sandbox_sPmUKVMZYWvsfay1Wgtp6w8MEacJCsoqb9Gklbqx',
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const html = liqpay.cnb_form({
                action: 'pay',
                amount: 100, // Вставте суму платежу зі свого коду
                currency: 'UAH',
                description: 'Оплата заказа',
                order_id: '5324', // Унікальний ідентифікатор замовлення
                version: '3',
            });

            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(html);
        } catch (error) {
            console.error(error);
            res.status(500).send('Помилка при створенні платежу');
        }
    } else {
        res.status(405).end();
    }
}
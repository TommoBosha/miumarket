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
                amount: 100,
                currency: 'UAH',
                description: 'Оплата заказа',
                sandbox: 0,
                server_url: 'https://test.com/billing/pay-callback/',
                order_id: '5324',
                version: '3',
            });

            console.log(html)

            res.status(200).send(html);
        } catch (error) {
            console.error(error);
            res.status(500).send('Помилка при створенні платежу');
        }
    } else {
        res.status(405).end();
    }
}
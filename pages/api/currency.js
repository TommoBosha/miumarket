import { mongooseConnect } from "../../lib/mongoose";
import { Currency } from "../../models/Currency";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        try {
            const latestCurrency = await Currency.findOne().sort({ currency: -1 });
            if (!latestCurrency) {
                return res.status(404).json({ message: 'Курс валюти не знайдено' });
            }
            res.json(latestCurrency);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Помилка на сервері' });
        }
    }
}
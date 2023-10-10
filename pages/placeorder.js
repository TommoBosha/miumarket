import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';

export default function PlaceOrderScreen() {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems, shippingAddress, paymentMethod } = cart;
    const [currency, setCurrency] = useState(null);

    useEffect(() => {
        async function fetchCurrency() {
            const { data } = await axios.get(`/api/currency/`);
            setCurrency(data);
        }

        fetchCurrency();
    }, []);

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    const itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.quantity * c.price * currency?.currency, 0)
    );

    const shippingPrice = itemsPrice > 5000 ? 0 : 100;

    const totalPrice = round2(itemsPrice + shippingPrice);

    const router = useRouter();
    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment');
        }
    }, [paymentMethod, router]);

    const [loading, setLoading] = useState(false);

    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
            });
            setLoading(false);
            dispatch({ type: 'CART_CLEAR_ITEMS' });
            Cookies.set(
                'cart',
                JSON.stringify({
                    ...cart,
                    cartItems: [],
                })
            );
            router.push(`/order/${data._id}`);
        } catch (err) {
            setLoading(false);
            toast.error(getError(err));
        }
    };

    return (
        <Layout title="Зробити замовлення">
            <div className=' m-auto my-6'
                style={{ width: '1040px' }}
            >
                <CheckoutWizard activeStep={3} />
                <h1 className="mb-4 text-xl">Зробити замовлення</h1>
                {cartItems.length === 0 ? (
                    <div>
                        Cart is empty. <Link href="/">Відправитися за покупками</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-4 md:gap-5">
                        <div className="overflow-x-auto md:col-span-3">
                            <div className="card  p-5">
                                <h2 className="mb-2 text-lg">Адреса доставки</h2>
                                <div>
                                    {shippingAddress.fullName}, {shippingAddress.address},{' '}
                                    {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                                    {shippingAddress.country}
                                </div>
                                <div>
                                    <Link href="/shipping">Змінити</Link>
                                </div>
                            </div>
                            <div className="card  p-5">
                                <h2 className="mb-2 text-lg">Спосіб оплати</h2>
                                <div>{paymentMethod}</div>
                                <div>
                                    <Link href="/payment">Змінити</Link>
                                </div>
                            </div>
                            <div className="card overflow-x-auto p-5">
                                <h2 className="mb-2 text-lg">Товари замовлення</h2>
                                <table className="min-w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="px-5 text-left">Товар</th>
                                            <th className="    p-5 text-right">Кількість</th>
                                            <th className="  p-5 text-right">Ціна</th>
                                            <th className="p-5 text-right">Проміжний підсумок</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item._id} className="border-b">
                                                <td>
                                                    <Link href={`/product/${item.slug}`} className="flex items-center">

                                                        <Image
                                                            src={item.images[0]}
                                                            alt={item.title}
                                                            width={50}
                                                            height={50}
                                                        ></Image>
                                                        &nbsp;
                                                        {item.title}

                                                    </Link>
                                                </td>
                                                <td className=" p-5 text-right">{item.quantity}</td>
                                                <td className="p-5 text-right">{item.price * currency?.currency} грн.</td>
                                                <td className="p-5 text-right">
                                                    {item.quantity * item.price * currency?.currency} грн.
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div>
                                    <Link href="/cart">Змінити</Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="card  p-5">
                                <h2 className="mb-2 text-lg">Сума замовлення</h2>
                                <ul>
                                    <li>
                                        <div className="mb-2 flex justify-between">
                                            <div>Товари</div>
                                            <div>{itemsPrice} грн.</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="mb-2 flex justify-between">
                                            <div>Доставка</div>
                                            <div>{shippingPrice} грн.</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="mb-2 flex justify-between">
                                            <div>Загальна сума</div>
                                            <div>{totalPrice} грн.</div>
                                        </div>
                                    </li>
                                    <li>
                                        <button
                                            disabled={loading}
                                            onClick={placeOrderHandler}
                                            className="primary-button w-full"
                                        >
                                            {loading ? 'Loading...' : 'Зробити замовлення'}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

PlaceOrderScreen.auth = true;
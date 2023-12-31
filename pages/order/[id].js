
import React, { useEffect, useReducer } from 'react'
import Layout from '../../components/Layout';
import { useRouter } from 'next/router'
import axios from 'axios';
import { getError } from '../../utils/error';
import Link from "next/link";
import Image from "next/image";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false, errorPay: action.payload };
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false, errorPay: '' };

        case 'DELIVER_REQUEST':
            return { ...state, loadingDeliver: true };
        case 'DELIVER_SUCCESS':
            return { ...state, loadingDeliver: false, successDeliver: true };
        case 'DELIVER_FAIL':
            return { ...state, loadingDeliver: false };
        case 'DELIVER_RESET':
            return {
                ...state,
                loadingDeliver: false,
                successDeliver: false,
            };

        default:
            state;
    }
}

export default function OrderScreen() {
    const { query } = useRouter();
    const orderId = query.id;

    const [
        {
            loading,
            error,
            order,
            // successPay,
            // loadingDeliver,
            // successDeliver
        },
        dispatch,
    ] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
    }, [order, orderId]);
    const {
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,

        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
    } = order;

    return (
        <Layout title={`Замовлення ${orderId}`}>
            <h1 className="mb-4 text-xl">{`Замовлення ${orderId}`}</h1>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="alert-error">{error}</div>
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
                            {isDelivered ? (
                                <div className="alert-success">Delivered at {deliveredAt}</div>
                            ) : (
                                <div className="alert-error">Не доставлено</div>
                            )}
                        </div>

                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Спосіб оплати</h2>
                            <div>{paymentMethod}</div>
                            {isPaid ? (
                                <div className="alert-success">Paid at {paidAt}</div>
                            ) : (
                                <div className="alert-error">Не оплачено</div>
                            )}
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
                                    {orderItems.map((item) => (
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
                                            <td className="p-5 text-right">{item.price} грн.</td>
                                            <td className="p-5 text-right">
                                                {item.quantity * item.price} грн.
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                </li>{' '}
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Доставка згідно тарифу перевізника</div>

                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Загальна сума</div>
                                        <div>{totalPrice} грн.</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}

OrderScreen.auth = true;
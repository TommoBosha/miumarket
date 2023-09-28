import React, { useContext } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";


function CartScreen() {
    const { state, dispatch } = useContext(Store);
    const router = useRouter();
    const { data: session } = useSession();

    const {
        cart: { cartItems },
    } = state;

    const removeItemHandler = (item) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    };

    const updateCartHandler = async (item, qty) => {
        const quantity = Number(qty);
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            return toast.error('Пробачте, товар закінчівся')
        }
        dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
        toast.success('Товар додан до кошика')
    };

    const handleButtonClick = () => {
        if (session) {
            // Якщо користувач залогінений, переходимо на сторінку доставки
            router.push('/shipping');
        } else {
            // Якщо користувач не залогінений, переходимо на сторінку логіну з редіректом на сторінку доставки
            router.push('/login?redirect=/shipping');
        }
    };

    return (
        <Layout title="Кошик">
            <h1 className="mb-4 text-xl">Кошик</h1>
            {cartItems.length === 0 ? (
                <div>
                    Кошик пустий. <Link href="/">Повернутися до каталогу</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="min-w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="px-5 text-left">Виріб</th>
                                    <th className="p-5 text-right">Кількість</th>
                                    <th className="p-5 text-right">Ціна</th>
                                    <th className="p-5">Видалити</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.slug} className="border-b">
                                        <td>
                                            <Link
                                                href={`/product/${item.slug}`}
                                                className="flex items-center"
                                            >
                                                <Image
                                                    src={item.images}
                                                    alt={item.title}
                                                    width={50}
                                                    height={50}
                                                ></Image>
                                                &nbsp;
                                                {item.title}
                                            </Link>
                                        </td>
                                        <td className="p-5 text-right">
                                            <select
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateCartHandler(item, e.target.value)
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-5 text-right">{item.price}</td>
                                        <td className="p-5 text-right">
                                            <button onClick={() => removeItemHandler(item)}>
                                                <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card p-5">
                        <ul>
                            <li>
                                <div className="pb-3 text-xl">
                                    Загальна сума ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                                    )
                                </div>{" "}
                                :{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} грн.
                            </li>
                            <li>
                                <button
                                    onClick={handleButtonClick}
                                    className="primary-button w-full"
                                >
                                    Оформити замовлення
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </Layout>
    );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })

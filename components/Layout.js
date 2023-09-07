import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";

export default function Layout({ title, children }) {
    const { status, data: session } = useSession();
    const { state, dispatch } = useContext(Store);
    const [currentLanguage, setCurrentLanguage] = useState("uk");
    const { cart } = state;
    const [cartItemsCount, setcartItemsCoun] = useState(0);

    useEffect(() => {
        setcartItemsCoun(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    const toggleLanguage = () => {
        const newLanguage = currentLanguage === "uk" ? "en" : "uk";
        setCurrentLanguage(newLanguage);
    };

    const logoutClickHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' })
        signOut({ callbackUrl: '/login' });
    };

    return (
        <>
            <Head>
                <title>{title ? title + " - MIU Market" : "MIU Market"}</title>
                <meta name="description" content="Ecommerce site" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer position="bottom-center" limit={1} />

            <div className="flex min-h-screen flex-col justify-between">
                <header>
                    <nav
                        className="flex items-center justify-center px-4  space-x-8 shadow-md"
                        style={{ backgroundColor: "#F9F9F9" }}
                    >
                        <Link href="/">
                            <p
                                className="text-xl border-b-2 border-black"
                                style={{ fontFamily: "Myriad Pro", fontSize: "18px" }}
                            >
                                Каталог
                            </p>
                        </Link>

                        {/* Пошук */}
                        <div className="relative">
                            <input
                                type="text"
                                className="px-4 py-2 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300 "
                                style={{
                                    backgroundColor: "#3ACCE9",
                                    width: "303px",
                                    height: "30px",
                                }}
                                placeholder="Пошук"
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center">
                                <Image
                                    src="/images/search.svg"
                                    alt="Лупа"
                                    width={17}
                                    height={18}
                                />
                            </div>
                        </div>

                        <Link href="/">
                            <Image
                                src="/images/logo.svg"
                                alt="Логотип MIU Market"
                                width={206}
                                height={80}
                            />
                        </Link>

                        {/* Номер телефону */}
                        <p className="text-xl font-bold" style={{ color: "#3ACCE9" }}>
                            +380 66 523 23 07
                        </p>

                        {/* Група іконок */}
                        <div className="flex ">
                            {/* Логін */}

                            {status === "loading" ? (
                                "Loading"
                            ) : session?.user ? (
                                <Menu as='div' className='relative inline-block'>
                                    <Menu.Button style={{ color: "#3ACCE9" }}>
                                        <div className="p-2 relative flex items-center">
                                            <Image
                                                src="/images/user.svg"
                                                alt="Логін"
                                                width={23}
                                                height={25}
                                            />
                                            {/* <span className="p-2 text-xl font-bold">{session.user.name}</span> */}
                                        </div>
                                    </Menu.Button>
                                    <Menu.Items className='absolute left-0  w-56 bg-white origin-top-right shadow-lg'>
                                        <Menu.Item>
                                            <DropdownLink className='dropdown-link' href='/profile'>
                                                Профіль
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink className='dropdown-link' href='/order-history'>
                                                Історія замовлень
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link
                                                className='dropdown-link'
                                                href='#'
                                                onClick={logoutClickHandler}
                                            >
                                                Вихід
                                            </Link>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            ) : (
                                <Link href="/login" className="p-2 relative">
                                    {/* <div className="relative"> */}
                                    <Image
                                        src="/images/user.svg"
                                        alt="Логін"
                                        width={23}
                                        height={25}
                                    />
                                    {/* </div> */}
                                </Link>
                            )}

                            {/* Корзина */}
                            <Link href="/cart" className="p-2 relative">
                                <Image
                                    src="/images/cart.svg"
                                    alt="Корзина"
                                    width={27}
                                    height={24}
                                />
                                {cartItemsCount > 0 && (
                                    <span
                                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold text-white"
                                        style={{
                                            background: "#3ACCE9",
                                        }}
                                    >
                                        {cartItemsCount}
                                    </span>
                                )}
                            </Link>

                            {/* Смена теми */}
                            <div className="p-2 relative">
                                <Image
                                    src="/images/themeswitcher.svg"
                                    alt="Смена теми"
                                    width={23}
                                    height={23}
                                />
                            </div>

                            {/* Світчер смени мови */}
                            <div className="p-2 relative">
                                <button
                                    onClick={toggleLanguage}
                                    className="w-6 h-6  rounded-full flex items-center justify-center focus:outline-none"
                                >
                                    {currentLanguage === "uk" ? "УК" : "EN"}
                                </button>
                            </div>
                        </div>
                    </nav>
                </header>

                <main className="container m-auto mt-4 relative px-4 ">{children}</main>

                <footer className="flex h-10 justify-center items-center  shadow-inner">
                    © All rights reserved
                </footer>
            </div>
        </>
    );
}

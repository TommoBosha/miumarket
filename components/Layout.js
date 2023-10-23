import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import Footer from "./Footer";
import BurgerMenu from "./BurgerMenu";
import AuthModal from "./AuthModal";


export default function Layout({ title, children }) {
    const { status, data: session } = useSession();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setcartItemsCoun] = useState(0);
    const [navbar, setNavbar] = useState(false);

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isLoginModal, setIsLoginModal] = useState(true);

    useEffect(() => {
        setcartItemsCoun(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);


    const logoutClickHandler = () => {
        Cookies.remove("cart");
        dispatch({ type: "CART_RESET" });
        signOut({ callbackUrl: "/" });
    };

    return (
        <>
            <Head>
                <title>{title ? title + " - MIU Market" : "MIU Market"}</title>
                <meta name="description" content="Ecommerce site" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer position="bottom-center" limit={1} />

            <div className="flex min-h-screen flex-col justify-between" >
                <header>
                    <nav className="flex items-center justify-center   shadow-md" >
                        <div className="relative " style={{ marginRight: "60px" }}>
                            <button
                                className="p-2  text-gray-700 rounded-md outline-none cursor-pointer"
                                onClick={() => setNavbar(!navbar)}
                            >
                                <Image
                                    src={navbar ? "/images/close.svg" : "/images/hamburger-menu.svg"}
                                    width={30}
                                    height={30}
                                    alt="logo"
                                />
                            </button>

                            {/* Burger menu */}

                            <BurgerMenu setNavbar={setNavbar} navbar={navbar} />
                        </div>



                        {/* Пошук */}
                        <div className="relative" style={{ marginRight: "60px" }}>
                            <input
                                type="text"
                                className="px-4 py-2 rounded-full text-white placeholder-white focus:outline-none focus:ring-2  "
                                style={{
                                    backgroundColor: "#3ACCE9",
                                    width: "264px",
                                    height: "28px",
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
                                width={182}
                                height={70}
                                style={{ marginRight: "104px" }}
                            />
                        </Link>

                        {/* Номер телефону */}
                        <p className="text-xl font-bold" style={{ color: "#3ACCE9", marginRight: "74px" }}>
                            +380 66 523 23 07
                        </p>

                        {/* Група іконок */}
                        <div className="flex gap-5" >
                            {/* Логін */}

                            {status === "loading" ? (
                                "Loading"
                            ) : session?.user ? (
                                <Menu as="div" className="relative inline-block">

                                    <Menu.Button style={{ color: "#3ACCE9" }}>
                                        <div className="py-2 relative flex items-center">
                                            <Image
                                                src="/images/user.svg"
                                                alt="Логін"
                                                width={23}
                                                height={25}
                                            />

                                        </div>
                                    </Menu.Button>
                                    <Menu.Items className="absolute left-0  w-56 bg-white origin-top-right shadow-lg">
                                        <Menu.Item>
                                            <DropdownLink className="dropdown-link" href="/profile">
                                                Профіль
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink
                                                className="dropdown-link"
                                                href="/order-history"
                                            >
                                                Історія замовлень
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link
                                                className="dropdown-link"
                                                href="#"
                                                onClick={logoutClickHandler}
                                            >
                                                Вихід
                                            </Link>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            ) : (
                                <button
                                    className="p-2 text-gray-700 rounded-md outline-none cursor-pointer"
                                    onClick={() => setIsAuthModalOpen(true)} // Відкриття модального вікна
                                >

                                    <Image
                                        src="/images/user.svg"
                                        alt="Логін"
                                        width={23}
                                        height={25}
                                    />

                                </button>
                            )}

                            {/* Корзина */}
                            <Link href="/cart" className="py-2 mr-2 relative">
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


                        </div>
                    </nav>
                </header>

                <main className="  relative z-1">{children}</main>

                <footer
                    className="flex   justify-center items-center  shadow-inner  relative z-0 "
                    style={{ background: "#3ACCE9" }}
                >
                    <div className="flex-col" style={{ width: "100%" }}>
                        <Footer />

                        <p className="bg-white py-8 pl-56">Copyright © 2023</p>
                    </div>
                </footer>
            </div>
            {isAuthModalOpen && (
                <AuthModal
                    onClose={() => setIsAuthModalOpen(false)}
                    isLogin={isLoginModal}
                    setIsLogin={setIsLoginModal}
                />
            )}
        </>
    );
}


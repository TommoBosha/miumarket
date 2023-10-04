// import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const BurgerMenu = ({ navbar, setNavbar }) => {


    const [isEscKeyPressed, setIsEscKeyPressed] = useState(false);


    const burgerMenuRef = useRef(null);


    const handleKeyPress = (e) => {
        if (e.key === "Escape") {
            setIsEscKeyPressed(true);
        }
    };


    const handleBurgerMenuClick = (e) => {
        if (burgerMenuRef.current && !burgerMenuRef.current.contains(e.target)) {
            setNavbar(false);
        }
    };

    useEffect(() => {

        window.addEventListener("keydown", handleKeyPress);

        window.addEventListener("click", handleBurgerMenuClick);
        if (isEscKeyPressed) {
            setNavbar(false);
            setIsEscKeyPressed(false);
        }

        return () => {

            window.removeEventListener("keydown", handleKeyPress);
            window.removeEventListener("click", handleBurgerMenuClick);
        };
    }, [isEscKeyPressed]);


    return (
        <div
        >
            <div
                className={` flex-1 justify-self-center mt-8 block rounded-b-2xl pb-6  ${navbar ? 'p-0  block' : 'hidden'
                    }`}
                style={{
                    position: 'fixed',
                    // top: '0',
                    left: navbar ? '0' : '-100%',
                    // height: '100%',
                    backgroundColor: '#F4F4F4',
                    transition: 'left 0.3s ease',
                }}
            >
                {/* <div style={{
                    right: 0,
                    position: 'absolute',
                    top: '0',
                }}>
                    <button
                        className="p-2 text-gray-700 rounded-md outline-none cursor-pointer"
                        onClick={() => setNavbar(!navbar)}
                    >
                        <Image
                            src={"/images/close.svg"}
                            width={30}
                            height={30}
                            alt="logo"
                        />
                    </button>
                </div> */}


                <ul className="text-left h-auto  justify-center flex  flex-col px-6 pb-32">
                    <li
                        className="text-xl text-black pb-2 px-2    hover:text-white custom-li" >
                        <Link
                            href="/"
                            onClick={() => setNavbar(!navbar)}

                        >
                            Головна
                        </Link>
                    </li>
                    <li className=" text-xl text-black pb-2 px-2    hover:text-white custom-li">
                        <Link href="/catalog" onClick={() => setNavbar(!navbar)}>
                            Каталог
                        </Link>
                    </li>
                    <li className=" text-xl text-black pb-2 px-2    hover:text-white custom-li">
                        <Link href="#about" onClick={() => setNavbar(!navbar)}>
                            Про нас
                        </Link>
                    </li>
                    <li className=" text-xl text-black pb-2 px-2    hover:text-white custom-li">
                        <Link href="/contacts" onClick={() => setNavbar(!navbar)}>
                            Контакти
                        </Link>
                    </li>
                    <li className=" text-xl text-black pb-2 px-2    hover:text-white custom-li">
                        <Link href="/delivery" onClick={() => setNavbar(!navbar)}>
                            Доставка та оплата
                        </Link>
                    </li>
                    <li className=" text-xl text-black pb-2 px-2   hover:text-white custom-li">
                        <Link href="/partners" onClick={() => setNavbar(!navbar)}>
                            Партнерам
                        </Link>
                    </li>
                </ul>
            </div>
        </div >
    );
};

export default BurgerMenu;
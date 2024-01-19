import React, { useContext, useEffect, useState } from "react";
import BurgerMenu from "../BurgerMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Store } from "../../utils/Store";
import Cookies from "js-cookie";

function Header({ setIsAuthModalOpen }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setcartItemsCoun] = useState(0);
  const [navbar, setNavbar] = useState(false);
  const [query, setQuery] = useState("");

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/search`,
      query: { phrase: query },
    });
  };

  useEffect(() => {
    setcartItemsCoun(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className=" container container-header   md:max-w-[1279px] xl:max-w-[2560px]">
      <nav className="flex md:max-w-[780px] xl:max-w-[1440px] mx-auto items-center justify-between shadow-[bottom] py-[16px] md:py-[22px]">
        <div className="relative  mr-4 md:mr-2 xl:mr-[66px]">
          <button
            className="  text-gray-700 rounded-md outline-none cursor-pointer"
            onClick={() => setNavbar(!navbar)}
          >
            <svg className="w-[22px] h-[10px] stroke-black md:w-[18px] md:h-2 xl:w-6 ">
              <use xlinkHref="/images/icons.svg#icon-menu" />
            </svg>
          </button>

          {/* Burger menu */}

          <BurgerMenu setNavbar={setNavbar} navbar={navbar} />
        </div>

        {/* Пошук */}
        <div className="relative mr-4 xl:mr-[66px]">
          <form onSubmit={submitHandler}>
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="xl:px-4 pl-[26px] md:pl-[28px] xl:pl-[30px] w-[212px] md:w-[222px] xl:w-[264px] h-[28px] md:h-[24px] xl:h-[34px] border-none bg-primary rounded-full text-white placeholder-white focus:outline-none   "
              placeholder="Пошук"
            />
            <button
              type="submit"
              className="absolute inset-y-0 left-2 md:left-[10px] xl:left-3 flex items-center"
            >
              <Image
                src="/images/search.svg"
                alt="Лупа"
                width={11}
                height={11}
              />
            </button>
          </form>
        </div>

        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Логотип MIU Market"
            width={134}
            height={52}
            className="hidden md:flex md:mr-5 xl:mr-[86px] md:w-[134px] md:h-[52px]  xl:w-[180px] xl:h-[70px] w-auto h-auto "
          />
        </Link>

        {/* Номер телефону */}
        <p
          className="hidden md:flex md:text-[20px] md:leading-[16.78px] md:font-bold md:text-primary md:mr-6
        xl:text-[22px] xl:leading-[18.45px] xl:mr-[82px] }"
        >
          +380 66 523 23 07
        </p>

        {/* Група іконок */}
        <div className="flex  items-center justify-center gap-[6px] md:gap-[7px] xl:gap-3 ">
          {/* Логін */}

          {status === "loading" ? (
            "Loading"
          ) : session?.user ? (
            <div className="relative flex items-center">
              <Link href="/profile" style={{ color: "#3ACCE9" }}>
                <svg className="w-4 h-4">
                  <use xlinkHref="/images/icons.svg#icon-user" />
                </svg>
              </Link>
            </div>
          ) : (
            <button
              className=" text-gray-700 rounded-md outline-none cursor-pointer"
              onClick={() => setIsAuthModalOpen(true)} // Відкриття модального вікна
            >
              <svg className="w-4 h-4">
                <use xlinkHref="/images/icons.svg#icon-user" />
              </svg>
            </button>
          )}

          {/* Корзина */}
          <Link href="/cart" className=" relative">
            <svg className="w-[22px] h-5">
              <use xlinkHref="/images/icons.svg#icon-cart" />
            </svg>

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

          {/* Логаут */}
          <Link
            href="#"
            className=" text-gray-700 rounded-md outline-none cursor-pointer"
            onClick={logoutClickHandler}
          >
            <svg className="w-4 h-4">
              <use xlinkHref="/images/icons.svg#icon-logout" />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;

import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import CartArrowIcon from "../components/CartArrowIcon";
import QuantityCounter from "../components/QuantityCounter";
import { useMediaQuery } from "react-responsive";
import AuthModal from "../components/AuthModal";

function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const imageSrc = isMobile ? "/images/gray-mobile.svg" : "/images/gray.svg";

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
      return toast.error("Пробачте, товар закінчівся");
    }
    dispatch({
      type: "CART_UPDATE_QUANTITY",
      payload: { slug: item.slug, quantity },
    });
    toast.success("Кількість товару оновлено");
  };

  const handleButtonClick = () => {
    if (session) {
      router.push("/shipping");
    } else {
      router.push("/login?redirect=/shipping");
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const clearCartHandler = () => {
    dispatch({ type: "CART_CLEAR_ITEMS" });
    toast.success("Кошик очищено");
  };

  return (
    <Layout title="Кошик">
      <div className="bg-graybg">
        <div className="container xl:max-w-[1440px] relative z-20 pb-[30px] md:pb-[34px] xl:pb-[58px]">
          <div className="pt-[18px] md:pt-[28px] xl:pt-[38px] flex flex-row items-baseline justify-between">
            <h1 className=" text-[24px] md:text-[27px] xl:text-[30px] font-bold uppercase">
              Кошик
            </h1>
            <Link
              href="/catalog"
              className="text-[12px] hover:text-primary hover:stroke-primary flex flex-row items-center gap-1 "
            >
              <CartArrowIcon />
              <p className="underline">Повернутися до покупок </p>{" "}
            </Link>
          </div>

          {cartItems.length === 0 ? (
            <div className=" h-[30vh]">
              Кошик пустий.{" "}
              <Link
                href="/catalog"
                className="text-[12px] hover:text-primary hover:stroke-primary flex flex-row items-center gap-1 "
              >
                <CartArrowIcon />
                <p className="underline">Повернутися до покупок </p>{" "}
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-cartContainer xl:grid-cols-cartContainerXl md:gap-[18px] xl:gap-[48px] pt-[9px] md:pt-[18px] gap-3.5  ">
              <div className="grid grid-cols-1 gap-[14px] ">
                {cartItems.map((item) => (
                  <div
                    key={item.slug}
                    className="border-[2px] py-[15px] xl:py-[28px] border-white  grid grid-cols-cart xl:grid-cols-cartXl gap-[14px] xl:gap-[28px] relative"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      className="flex justify-between items-center pl-[14px] xl:pl-[22px]"
                    >
                      {item.images && item.images.length > 0 && (
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          width={70}
                          height={70}
                          className="xl:w-[96px] xl:h-[96px]"
                        />
                      )}
                    </Link>
                    <div className="flex flex-col xl:flex-row justify-between  xl:pt-[10px]">
                      <div className="">
                        <p className="text-[15px] underline">{item.title}</p>
                        <p className="text-[12px] xl:text-[11px]">
                          Артикул: {item.productIndex}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between md:justify-start md:gap-[25px] items-center xl:items-start pt-[5px] xl:pt-0">
                        <QuantityCounter
                          value={item.quantity}
                          onChange={(newQuantity) =>
                            updateCartHandler(item, newQuantity)
                          }
                          max={item.countInStock}
                        />
                        <p className="text-[19px] text-primary font-bold pr-[7px] xl:pr-[37px] ">
                          {item.price} грн
                        </p>
                      </div>

                      <button
                        onClick={() => removeItemHandler(item)}
                        className="absolute top-[11px] right-[8px] text-cart md:text-white"
                      >
                        <XMarkIcon className="h-[14px] w-[14px]"></XMarkIcon>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className=" ">
                <div className="px-[23px] md:py-[8px] pt-[15px] pb-[12px] xl:pt-[20px] xl:pb-[15px] bg-primary">
                  <div className="flex flex-row justify-between pb-[16px]  md:pb-1  xl:pb-[12px] uppercase text-white font-bold text-[15px] xl:text-[21px]">
                    <p className="">
                      {cartItems.reduce((a, c) => a + c.quantity, 0)} товара на
                      суму:
                    </p>{" "}
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}{" "}
                    грн
                  </div>
                  <div className="flex flex-col justify-center">
                    {session?.user ? (
                      <button
                        onClick={handleButtonClick}
                        className="primary-button w-full"
                      >
                        Оформити замовлення
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsAuthModalOpen(true)}
                        className="primary-button w-full"
                      >
                        Оформити замовлення
                      </button>
                    )}

                    <button
                      onClick={clearCartHandler}
                      className="text-[10px] xl:text-[11px]  pt-[13px] md:pt-1"
                    >
                      Очистити кошик
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {isClient && (
          <div className="footer-image-wrapper">
            <Image
              src={imageSrc}
              alt="uzor"
              width={1900}
              height={253}
              className=" absolute left-0 bottom-0 "
              priority={true}
            />
          </div>
        )}
      </div>

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          isLogin={isLoginModal}
          setIsLogin={setIsLoginModal}
        />
      )}
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });

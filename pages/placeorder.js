import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";
import { getSession } from "next-auth/react";
import { useMediaQuery } from "react-responsive";

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const imageSrc = isMobile ? "/images/gray-mobile.svg" : "/images/gray.svg";

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const totalPrice = round2(itemsPrice);

  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [session, setSession] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const getSessionData = async () => {
    const session = await getSession();
    return session;
  };

  useEffect(() => {
    const getSessionAndSetState = async () => {
      const sessionData = await getSessionData();
      setSession(sessionData);
    };

    getSessionAndSetState();
  }, []);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
    setIsClient(true);
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const updateProductQuantity = async () => {
    try {
      for (const item of cartItems) {
        await axios.put(`/api/products/${item._id}`, {
          _id: item._id,
          countInStock: item.countInStock - item.quantity,
        });
      }
    } catch (err) {
      console.error(getError(err));
      toast.error(getError(err));
    }
  };
  console.log(cartItems);
  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const session = await getSessionData();
      if (!session || !session.user || !session.user.email) {
        throw new Error("Не вдалося отримати інформацію про користувача");
      }

      const user = session.user.email;

      const orderData = {
        orderItems: cartItems,
        shippingAddress: {
          ...shippingAddress,
          deliveryMethod: shippingAddress.deliveryMethod || "defaultMethod",
        },
        paymentMethod,
        itemsPrice,
        totalPrice,
        user,
      };

      const { data } = await axios.post("/api/orders", orderData);

      await updateProductQuantity();
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      console.log(getError(err));
      toast.error(getError(err));
    }
  };

  const displayShippingDetails = () => {
    if (!shippingAddress || !shippingAddress.deliveryMethod) {
      return "Метод доставки не визначено";
    }

    let shippingDetails = "";

    if (shippingAddress.deliveryMethod === "novaPoshta") {
      shippingDetails = `Метод доставки: Нова Пошта. ПІБ: ${shippingAddress.fullName}, Телефон: ${shippingAddress.phone}, Місто: ${shippingAddress.cityName}, Відділення: ${shippingAddress.warehouses}`;
    } else if (shippingAddress.deliveryMethod === "ukrPoshta") {
      shippingDetails = `Метод доставки: Укрпошта. ПІБ: ${shippingAddress.fullName}, Телефон: ${shippingAddress.phone}, Адреса: ${shippingAddress.address}, Місто: ${shippingAddress.city}, Індекс: ${shippingAddress.postCode}, Країна: ${shippingAddress.country}`;
    }

    return shippingDetails;
  };

  return (
    <Layout title="Зробити замовлення">
      <div className="bg-graybg">
        <div className=" container relative z-10">
          <div className="flex justify-center">
            <CheckoutWizard activeStep={3} />
          </div>
          <h1 className="pb-[10px] md:pb-[14px] xl:pb-[28px] text-[24px] md:text-[27px] xl:text-[3]px font-bold uppercase">Інформація</h1>
          {cartItems.length === 0 ? (
            <div>
              Cart is empty. <Link href="/">Відправитися за покупками</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-cartContainer xl:grid-cols-cartContainerXl md:gap-[18px] xl:gap-[48px] pt-[9px] md:pt-[18px] gap-3.5  ">
              <div className="grid grid-cols-1 gap-[14px] ">
                <div className="border-[2px] py-[10px] px-[12px] xl:py-[28px] border-secondary  xl:gap-[28px] relative">
                  <h2 className="mb-2 text-[15px] font-bold uppercase leading-[22.5px] text-white">Адреса</h2>
                  <div className="text-[12px] md:text-[15px] leading-[18px] md:leading-[22.5px]">{displayShippingDetails()}</div>
                  <div>
                    <Link href="/shipping" className="text-[12px] md:text-[15px] leading-[18px] md:leading-[22.5px] text-secondary underline">Змінити</Link>
                  </div>
                </div>
                <div className="border-[2px] py-[10px] px-[12px] xl:py-[28px] border-secondary  xl:gap-[28px] relative">
                  <h2 className="mb-1 text-[15px] font-bold uppercase leading-[22.5px] text-white">Спосіб оплати</h2>
                  <div className=" text-[12px] md:text-[15px] leading-[18px] md:leading-[22.5px] ">{paymentMethod}</div>
                  
                
                    <Link href="/payment" className="text-[12px] md:text-[15px] leading-[18px] md:leading-[22.5px] text-secondary underline">Змінити</Link>
                  

                </div>
                <div className="grid md:grid-cols-cartContainer xl:grid-cols-cartContainerXl md:gap-[18px] xl:gap-[48px] pt-[9px] md:pt-[18px] gap-3.5 ">
                  
                  <div className="grid grid-cols-1 gap-[14px] border-secondary border-[2px]">
                  <h2 className="mb-2 text-[15px] font-bold uppercase leading-[22.5px] text-white">Товари замовлення</h2>
                    
                      {cartItems.map((item) => (
                        <div key={item._id} className=" py-[10px] px-[12px] xl:py-[28px]   xl:gap-[28px] relative">
                          <td>
                            <Link
                              href={`/product/${item.slug}`}
                              className="flex items-center"
                            >
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

                          <div>
                    <Link href="/cart" className="text-[12px] md:text-[15px] leading-[18px] md:leading-[22.5px] text-secondary underline">Змінити</Link>
                  </div>
                        </div>
                      ))}
                   
                  </div>
                 
                </div>
              </div>
              <div>
                <div className="px-[23px] md:py-[8px] pt-[15px] pb-[12px] xl:pt-[20px] xl:pb-[15px] bg-counter ">
                  
                  <h2 className=" text-[15px] xl:text-[25px] xl:text-center font-bold uppercase">Сума замовлення</h2>

                  <div className="">
                    <p className="">Товари</p>
                  <div>{totalPrice} грн.</div>
                  </div>
                  <div>
                    
                      
                    
                    
                      <div className="mb-2 flex justify-between">
                        <div> Доставка згідно тарифу перевізника</div>
                      </div>
                    
                    
                      <div className="mb-2 flex justify-between">
                        <div>Загальна сума</div>
                        
                      </div>
                    
                    
                      <button
                        disabled={loading}
                        onClick={placeOrderHandler}
                        className=" primary-button placeorder w-full"
                      >
                        {loading ? "Loading..." : "Зробити замовлення"}
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
    </Layout>
  );
}

PlaceOrderScreen.auth = true;

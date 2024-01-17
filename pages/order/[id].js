import React, { useEffect, useReducer, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { getError } from "../../utils/error";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
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
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [isClient, setIsClient] = useState(false);

  const imageSrc = isMobile ? "/images/gray-mobile.svg" : "/images/gray.svg";

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
    setIsClient(true);
  }, [order, orderId]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
   

    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;
console.log(orderItems)
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
    <Layout title={`Замовлення ${orderId}`}>
        <div className="bg-graybg">
            <div className="container relative z-10 pb-[25px] md:pb-[42px] xl:pb-[124px]">
      <h1 className="xl:pl-[182px] pt-[12px]  text-[20px] md:text-[27px] xl:text-[3]px font-bold uppercase">{`Замовлення ${orderId} `}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="max-w-xxl mx-auto grid md:grid-cols-cartContainer xl:grid-cols-placeorderContainerXl  md:gap-[24px] pt-[9px] md:pt-[18px] gap-3.5  ">
          <div className="grid grid-cols-1 gap-[14px] ">
            <div className="border-[2px] py-[10px] px-[12px]  border-secondary  xl:gap-[28px] relative">
              <h2 className="mb-2 text-[15px] font-bold uppercase leading-[22.5px] text-white">Адреса</h2>
              <div className="text-[12px] md:text-[15px] leading-[18px] md:leading-[22.5px]">{displayShippingDetails()}</div>
              {isDelivered ? (
                <div className="alert-success">Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Не доставлено</div>
              )}
            </div>

            <div className="border-[2px] py-[10px] px-[12px]  border-secondary  xl:gap-[28px] relative">
              <h2 className="mmb-2 text-[15px] font-bold uppercase leading-[22.5px] text-white">Спосіб оплати</h2>
              <div className="text-[12px] md:text-[15px] leading-[18px] md:leading-[22.5px]">{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Не оплачено</div>
              )}
            </div>

            <div className="grid md:grid-cols-productContainer xl:grid-cols-productContainerXl md:gap-[18px] xl:gap-[48px]  gap-3.5">
              
              <div className="grid grid-cols-1 gap-[14px] border-secondary border-[2px]">
                
                
                  {orderItems.map((item) => (
                    <div key={item._id} className="py-[10px] px-[12px] xl:px-[24px] xl:py-[18px]   xl:gap-[28px] relative">
                      <div className="flex items-center gap-[12px] md:gap-[17px] md:items-start">
                        
                        <Link
                          href={`/product/${item.slug}`}
                         
                        >
                           <Image
                              src={item.images[0]}
                              alt={item.title}
                              width={102}
                              height={102}
                              className="w-[102px] h-[102px] md:w-[76px] md:h-[76px] border-[1px] border-white"
                            />
                          </Link>
                          <div className="flex flex-col md:flex-row md:gap-[43px] xl:gap-[150px] md:justify-between md:items-start">
                            <div className="flex flex-col">
                              <p className="text-[15px] underline md:pb-[10px] md:w-[284px] xl:w-[313px]">
                                {item.title}
                              </p>
                              <p className="text-[12px] md:text-[11px] md:pb-[8px] ">
                                {item.productIndex}
                              </p>
                              
                            </div>
                            <div className="flex flex-row gap-[11px] md:gap-[37px] xl:gap-[61px] items-center md:items-end">
                              <div className="flex flex-col">
                                <p className=" text-[11px]  underline">
                                  ціна за одиницю
                                </p>
                                <p className="text-[15px] md:text-[20px] xl:text-[15px] font-bold ">
                                  {item.price} грн
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <p className=" text-[11px]  underline">
                                  загальна вартість
                                </p>
                                <p className=" text-[15px] md:text-[20px] xl:text-[15px] font-bold text-primary">
                                  {item.quantity * item.price} грн
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                  ))}
               
              </div>
            </div>
          </div>
          <div>
            <div className="md:min-h-[168px] px-[20px] md:py-[8px] pt-[15px] pb-[12px] xl:pt-[20px] xl:pb-[17px] bg-counter ">
              <h2 className="text-[15px] xl:text-[24px] xl:text-center font-bold uppercase">Сума замовлення</h2>
              
              <div className=" flex justify-between">
                    <p className="text-[15px]">Товари</p>
                    <div className="text-[15px] font-bold text-primary">
                      {totalPrice} грн
                    </div>
                  </div>
                  <div>
                    <div className="pt-[5px] md:pt-[16px] xl:pt-[71px] text-[15px] md:text-[11px] font-bold uppercase text-center text-cart md:text-black xl:text-cart">
                      {" "}
                      Доставка згідно тарифу перевізника
                    </div>
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

OrderScreen.auth = true;

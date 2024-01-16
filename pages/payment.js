import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import ArrowIcon from "../components/ArrowIcon";

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Накладенний платіж");
  const [isClient, setIsClient] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const imageSrc = isMobile ? "/images/gray-mobile.svg" : "/images/gray.svg";

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push("/placeorder");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Layout title="Метод оплати">
      <div className="bg-graybg">
        <div className=" container relative z-10">
          <div className="flex justify-center pt-[8px] md:pt-[15px] xl:pt-[25px]">
            <CheckoutWizard activeStep={2} />
          </div>
          <form className="pb-4 text-xl" onSubmit={submitHandler}>
            <h1 className="pb-[10px] md:pb-[14px] xl:pb-[28px] text-[24px] md:text-[27px] xl:text-[3]px font-bold uppercase text-center">
              Метод оплати
            </h1>

            <div className="flex flex-row justify-center gap-[25px] md:gap-[64px] xl:gap-[50px]">
              {["Відділення Нової Пошти", "Накладенний платіж"].map(
                (payment) => {
                  return (
                    <div
                      key={payment}
                      className="mb-4 flex  gap-[2px] md:gap-[10px] items-center "
                    >
                      <input
                        name="paymentMethod"
                        className=" outline-none focus:ring-0"
                        id={payment}
                        type="radio"
                        checked={selectedPaymentMethod === payment}
                        onChange={() => setSelectedPaymentMethod(payment)}
                      />
                      <label
                        className="text-[12px] md:text-[15px]"
                        htmlFor={payment}
                      >
                        {payment}
                      </label>
                    </div>
                  );
                }
              )}
            </div>

            <div className=" flex justify-center gap-5 md:gap-[80px] pb-[22px] md:pb-[26px] xl:pb-[56px]">
              <button
                onClick={() => router.push("/shipping")}
                type="button"
                className="flex flex-row items-center gap-[10px] font-normal rounded-[10px] bg-buttonSecondary text-white hover:bg-primary py-2 px-4  uppercase text-[15px] md:text-[18px] md:tracking-[1.8px] focus:outline-none focus:shadow-outline"
              >
                <div className="rotate-180  fill-white">
                  <ArrowIcon />
                </div>{" "}
                Назад
              </button>
              <button className="flex flex-row items-center gap-[10px] font-normal rounded-[10px] bg-primary hover:bg-white py-2 px-4  uppercase text-[15px] md:text-[18px] md:tracking-[1.8px] focus:outline-none focus:shadow-outline">
                Далі <ArrowIcon />
              </button>
            </div>
          </form>
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

PaymentScreen.auth = true;

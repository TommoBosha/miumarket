import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { useForm } from "react-hook-form";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import NovaPoshta from "../components/NovaPoshta";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import ArrowIcon from "../components/ArrowIcon";

export default function ShippingScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [cityName, setCityName] = useState("");
  const [warehouses, setWarehouses] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("novaPoshta");
  const [isNovaPoshtaFilled, setIsNovaPoshtaFilled] = useState(false);
  const [isUkrPoshtaFilled, setIsUkrPoshtaFilled] = useState(false);

  const [novaPoshtaShippingAddress, setNovaPoshtaShippingAddress] = useState(
    {}
  );
  const [ukrPoshtaShippingAddress, setUkrPoshtaShippingAddress] = useState({});
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const imageSrc = isMobile ? "/images/gray-mobile.svg" : "/images/gray.svg";
  const { cart } = state;
  const { shippingAddress } = cart;

  const handleDeliveryMethodChange = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (shippingAddress) {
      if (deliveryMethod === "novaPoshta" && !isNovaPoshtaFilled) {
        setValue("novaPoshtaFullName", shippingAddress.fullName);
        setValue("novaPoshtaPhone", shippingAddress.phone);
        setIsNovaPoshtaFilled(true);
      } else if (deliveryMethod === "ukrPoshta" && !isUkrPoshtaFilled) {
        setValue("ukrPoshtaFullName", shippingAddress.fullName);
        setValue("ukrPoshtaPhone", shippingAddress.phone);
        setIsUkrPoshtaFilled(true);
      }
      setValue("cityName", shippingAddress.cityName);
      setValue("warehouses", shippingAddress.warehouses);
      setValue("address", shippingAddress.address);
      setValue("city", shippingAddress.city);
      setValue("postCode", shippingAddress.postCode);
      setValue("country", shippingAddress.country);
    }
    setIsClient(true);
  }, [
    deliveryMethod,
    setValue,
    shippingAddress,
    isNovaPoshtaFilled,
    isUkrPoshtaFilled,
  ]);

  const submitHandler = (data) => {
    let updatedShippingAddress;

    if (deliveryMethod === "novaPoshta") {
      updatedShippingAddress = {
        fullName: data.novaPoshtaFullName,
        phone: data.novaPoshtaPhone,
        warehouses: data.warehouses,
        cityName: data.cityName,
        deliveryMethod,
      };
      setNovaPoshtaShippingAddress(updatedShippingAddress);
    } else if (deliveryMethod === "ukrPoshta") {
      updatedShippingAddress = {
        fullName: data.ukrPoshtaFullName,
        phone: data.ukrPoshtaPhone,
        address: data.address,
        city: data.city,
        postCode: data.postCode,
        country: data.country,
        deliveryMethod,
      };
      setUkrPoshtaShippingAddress(updatedShippingAddress);
    }
    

    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: updatedShippingAddress,
    });

   
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress:
          deliveryMethod === "novaPoshta"
            ? novaPoshtaShippingAddress
            : ukrPoshtaShippingAddress,
      })
    );
    router.push("/payment");
  };

  return (
    <Layout title="Адреса доставки">
      <div className="bg-graybg">
        <div className=" container">
          <div className="flex justify-center">
            <CheckoutWizard activeStep={1} />
          </div>
          <form
            className="w-full max-w-xxl mx-auto pb-[23px] md:pb-[25px] xl:pb-[32px] relative z-10"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="hidden">Адреса доставки</h1>

            <div className="pb-[16px] flex justify-center items-center md:flex-col md:justify-start md:items-start md:gap-[5px]  gap-[25px]">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="novaPoshta"
                  checked={deliveryMethod === "novaPoshta"}
                  onChange={handleDeliveryMethodChange}
                />
                Нова Пошта
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  value="ukrPoshta"
                  checked={deliveryMethod === "ukrPoshta"}
                  onChange={handleDeliveryMethodChange}
                />
                Укрпошта
              </label>
            </div>

            {deliveryMethod === "novaPoshta" ? (
              // Форма для Нової Пошти
              <>
                <div className="mb-8 relative">
                  <label
                    htmlFor={
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaFullName"
                        : "ukrPoshtaFullName"
                    }
                    className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                  >
                    ПІБ
                  </label>
                  <input
                    className={`appearance-none border-2 rounded-3xl
                            ${
                              errors.product
                                ? "border-red-500"
                                : "border-gray-300"
                            } 
                            rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                    id={
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaFullName"
                        : "ukrPoshtaFullName"
                    }
                    autoFocus
                    {...register(
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaFullName"
                        : "ukrPoshtaFullName",
                      {
                        required: "Введіть ПІБ",
                      }
                    )}
                  />
                  {errors.fullName && (
                    <div className="text-red-500">
                      {errors.fullName.message}
                    </div>
                  )}
                </div>

                <NovaPoshta
                  cityName={cityName}
                  setCityName={setCityName}
                  warehouses={warehouses}
                  setWarehouses={setWarehouses}
                  errors={errors}
                  register={register}
                />

                <div className="mb-8 relative">
                  <label
                    htmlFor={
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaPhone"
                        : "ukrPoshtaPhone"
                    }
                    className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                  >
                    Телефон
                  </label>
                  <input
                    className={`appearance-none border-2 rounded-3xl
                        ${
                          errors.novaPoshtaPhone
                            ? "border-red-500"
                            : "border-gray-300"
                        } 
                        rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                    id={
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaPhone"
                        : "ukrPoshtaPhone"
                    }
                    autoFocus
                    {...register(
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaPhone"
                        : "ukrPoshtaPhone",
                      {
                        required: "Введіть номер телефону",
                        pattern: {
                          value: /^\+380\d{9}$/,
                          message:
                            "Номер телефону повинен бути у форматі +380990000000",
                        },
                      }
                    )}
                  />
                  {errors.novaPoshtaPhone && (
                    <div className="text-red-500">
                      {errors.novaPoshtaPhone.message}
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Форма для Укрпошти
              <>
                <div className="mb-8 relative">
                  <label
                    htmlFor={
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaFullName"
                        : "ukrPoshtaFullName"
                    }
                    className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                  >
                    ПІБ
                  </label>
                  <input
                    className={`appearance-none border-2 rounded-3xl
                            ${
                              errors.product
                                ? "border-red-500"
                                : "border-gray-300"
                            } 
                            rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                    id={
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaFullName"
                        : "ukrPoshtaFullName"
                    }
                    autoFocus
                    {...register(
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaFullName"
                        : "ukrPoshtaFullName",
                      {
                        required: "Введіть ПІБ",
                      }
                    )}
                  />
                  {errors.fullName && (
                    <div className="text-red-500">
                      {errors.fullName.message}
                    </div>
                  )}
                </div>

                <div className="mb-8 relative">
                  <label
                    htmlFor="address"
                    className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                  >
                    Адреса
                  </label>
                  <input
                    className={`appearance-none border-2 rounded-3xl
                            ${
                              errors.product
                                ? "border-red-500"
                                : "border-gray-300"
                            } 
                            rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                    id="address"
                    autoFocus
                    {...register("address", {
                      required: "Введіть Адресу",
                      minLength: {
                        value: 3,
                        message: "Адреса не повина бути меньша за 2 символів",
                      },
                    })}
                  />
                  {errors.address && (
                    <div className="text-red-500">{errors.address.message}</div>
                  )}
                </div>

                <div className="mb-8 relative">
                  <label
                    htmlFor="city"
                    className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                  >
                    Місто
                  </label>
                  <input
                    className={`appearance-none border-2 rounded-3xl
                            ${
                              errors.product
                                ? "border-red-500"
                                : "border-gray-300"
                            } 
                            rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                    id="city"
                    autoFocus
                    {...register("city", {
                      required: "Введіть ваше місто ",
                    })}
                  />
                  {errors.city && (
                    <div className="text-red-500">{errors.city.message}</div>
                  )}
                </div>

                <div className="mb-8 relative">
                  <label
                    htmlFor="country"
                    className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                  >
                    Країна
                  </label>
                  <input
                    className={`appearance-none border-2 rounded-3xl
                            ${
                              errors.product
                                ? "border-red-500"
                                : "border-gray-300"
                            } 
                            rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                    id="country"
                    autoFocus
                    {...register("country", {
                      required: "Введіть вашу країну ",
                    })}
                  />
                  {errors.country && (
                    <div className="text-red-500">{errors.country.message}</div>
                  )}
                </div>

                <div className="mb-8 relative">
                  <label
                    htmlFor="postCode"
                    className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                  >
                    Індекс
                  </label>
                  <input
                    className={`appearance-none border-2 rounded-3xl
                            ${
                              errors.product
                                ? "border-red-500"
                                : "border-gray-300"
                            } 
                            rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                    id="postCode"
                    autoFocus
                    {...register("postCode", {
                      required: "Введіть ваш індекс ",
                    })}
                  />
                  {errors.postCode && (
                    <div className="text-red-500">
                      {errors.postCode.message}
                    </div>
                  )}
                </div>

                <div className="mb-8 relative">
                  <label
                    htmlFor={
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaPhone"
                        : "ukrPoshtaPhone"
                    }
                    className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                  >
                    Телефон
                  </label>
                  <input
                    className={`appearance-none border-2 rounded-3xl
                        ${
                          errors.product ? "border-red-500" : "border-gray-300"
                        } 
                        rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                    id={
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaPhone"
                        : "ukrPoshtaPhone"
                    }
                    autoFocus
                    {...register(
                      deliveryMethod === "novaPoshta"
                        ? "novaPoshtaPhone"
                        : "ukrPoshtaPhone",
                      {
                        required: "Введіть номер телефону",
                        pattern: {
                          value: /^\+380\d{9}$/,
                          message:
                            "Номер телефону повинен бути у форматі +380990000000",
                        },
                      }
                    )}
                  />
                  {errors.novaPoshtaPhone && (
                    <div className="text-red-500">
                      {errors.novaPoshtaPhone.message}
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex  justify-center items-center">
              <button className=" flex flex-row items-center gap-[10px] font-normal rounded-[10px] bg-primary hover:bg-white py-2 px-4  uppercase text-[15px] md:text-[18px] md:tracking-[1.8px] focus:outline-none focus:shadow-outline ">
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

ShippingScreen.auth = true;

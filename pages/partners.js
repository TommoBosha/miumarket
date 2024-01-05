import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Layout from "../components/Layout";
import { sendPartnerForm } from "../lib/api";
import Image from "next/image";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

export default function Partners() {
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const imageSrc = isMobile ? "/images/gray-mobile.svg" : "/images/gray.svg";
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await sendPartnerForm(data);
      toast.success("Форма відправлена");
      reset();
    } catch (error) {
      console.error("Failed to submit form: ", error);
    }
  };
  useEffect(() => {
    setIsClient(true); 
   
}, [])

  return (
    <Layout>
      <div className="bg-graybg">
        <div className="container pt-[15px] md:pt-[28px] xl:pt-[30px]">
          <div className="md:mx-auto md:w-[211px] xl:w-[294px]">
            <h1 className="uppercase text-center  pb-[22px] xl:pb-[20px] font-bold text-secondary text-[24px] md:text-[27px] xl:text-[30px] leading-[24.91px] md:leading-[28.03px] ">
              форма для партнерства
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto pb-[23px] md:pb-[25px] xl:pb-[32px] relative z-10"
          >
            <div className="mb-8 relative">
              <Controller
                name="companyName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="companyName"
                    placeholder="Богдан Бондар"
                    className={`appearance-none border-2 rounded-3xl 
                                ${
                                  errors.companyName
                                    ? "border-red-500"
                                    : "border-secondary"
                                } 
                                rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                  />
                )}
              />

              <label
                className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                htmlFor="companyName"
              >
                Ім&#39;я
              </label>

              {errors.companyName && (
                <p className="text-red-500 text-xs italic">
                  {" "}
                  Поле обов&#39;язкове
                </p>
              )}
            </div>

            <div className="mb-8 relative">
              <Controller
                name="product"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="product"
                    placeholder="Що плануєте продавати"
                    className={`appearance-none border-2 rounded-3xl
                                 ${
                                   errors.product
                                     ? "border-red-500"
                                     : "border-gray-300"
                                 } 
                                 rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                  />
                )}
              />
              <label
                className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                htmlFor="product"
              >
                Продукт
              </label>
              {errors.product && (
                <p className="text-red-500 text-xs italic">
                  {" "}
                  Поле обов&#39;язкове
                </p>
              )}
            </div>

            <div className="mb-8 relative">
              <Controller
                name="socialMedia"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    id="socialMedia"
                    placeholder="Instagram, Telegram ..."
                    className={`appearance-none border-2 rounded-3xl
                                 w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                  />
                )}
              />
              <label
                className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                htmlFor="socialMedia"
              >
                Соцмережі
              </label>
            </div>

            <div className="mb-8 relative">
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: /^(\+380\d{9})$/ }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="phone"
                    placeholder="+380990000000"
                    className={`appearance-none border-2 rounded-3xl 
                                ${
                                  errors.phone
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } 
                                rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                  />
                )}
              />
              <label
                className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                htmlFor="phone"
              >
                Телефон
              </label>
              {errors.phone && (
                <p className="text-red-500 text-xs italic">
                  Введіть правильний формат телефону (+380XXXXXXXXX)
                </p>
              )}
            </div>

            <div className="mb-8 relative">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="email"
                    placeholder="example@mail.com"
                    className={`appearance-none border-2 rounded-3xl 
                                ${
                                  errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } 
                                rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
                  />
                )}
              />
              <label
                className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                htmlFor="email"
              >
                E-mail
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  Введіть правильний формат email(example@mail.com)
                </p>
              )}
            </div>

            <div className="pb-[23px] md:pb-[28px] xl:pb-[32px] relative">
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: true, minLength: 10 }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="description"
                    placeholder="Розкажіть про себе та товар який робите"
                    className={`appearance-none border-2 rounded-3xl 
                                ${
                                  errors.description
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }
                                 rounded w-full py-6 px-5 h-32 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px]
                                  focus:outline-none focus:shadow-outline`}
                  />
                )}
              />
              <label
                className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
                htmlFor="description"
              >
                Про себе
              </label>
              {errors.description && (
                <p className="text-red-500 text-xs italic">
                  Поле обов&#39;язкове
                </p>
              )}
            </div>
            <div className=" flex justify-center items-center">
              <button
                type="submit"
                className="font-normal rounded-[10px] bg-primary hover:bg-white py-2 px-4  uppercase text-[15px] md:text-[18px] md:tracking-[1.8px] focus:outline-none focus:shadow-outline  "
              >
                Відправити
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
        </div>)}
      </div>
    </Layout>
  );
}

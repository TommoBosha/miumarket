import React from "react";
import { useMediaQuery } from "react-responsive";

export default function CheckoutWizard({ activeStep = 0 }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const steps = [
    "Авторизація",
    "Адреса доставки",
    "Способ оплати",
    "Інформація про замовлення",
  ];

  return (
    <div className="max-w-xxl pt-[12px] pb-[6px] md:pb-[15px] xl:pb-[24px] flex flex-wrap justify-center md:justify-between text-center md:gap-[23px] ">
      {steps.map((step, index) => (
        <div
          key={step}
          className={` flex text-center 
                                ${
                                  index === activeStep
                                    ? "text-[12px] md:text-[15px] xl:text-[18px] font-bold text-primary md:border-b-2  md:border-accent uppercase leading-normal  "
                                    : " text-secondary uppercase text-[12px] md:text-[15px] xl:text-[18px] font-bold"
                                }
                                ${
                                  isMobile && index !== activeStep
                                    ? "hidden"
                                    : ""
                                }
                            `}
        >
          {step}
        </div>
      ))}
    </div>
  );
}

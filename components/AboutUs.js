import Image from "next/image";
import React from "react";

export default function AboutUs() {
    return (
        <div className="flex flex-col md:flex-row md:relative items-center md:justify-start" >
            <div className=" mt-[23px] md:mt-[39px] xl:mt-[120px] md:w-[342px] xl:w-[520px]  " >
                <Image
                    className="m-auto md:w-[217px] md:h-[84px]  "
                    src="/images/logo.svg"
                    alt="Логотип MIU Market"
                    width={147}
                    height={57}
                />
                <h1
                    className="flex items-center justify-center text-center text-[24px] md:text-[27px] xl:text-[30px] leading-normal gap-2 font-bold mt-[20px] md:mt-[26px] xl:mt-[50px] "
                    
                >
                    <Image
                        src="/images/arrow-left.svg"
                        alt="arrow-left"
                        width={57}
                        height={20}
                    />
                    ПРО НАС
                    <Image
                        src="/images/arrow-right.svg"
                        alt="arrow-right"
                        width={57}
                        height={20}
                    />
                </h1>

                <p className=" mx-0 text-center mb-[30px] md:mb-[35px] xl:mb-[115px] mt-[26px] md:mt-[18px]  xl:mt-[25px] text-[15px] xl:text-[18px] leading-[18px] xl:leading-[22px]">
                    Ласкаво просимо у світ унікальних українських сувенірів! Пориньте у
                    багату культуру та спадщину України з нашою колекцією вишуканих
                    сувенірів, створених з любов&#39;ю та майстерністю.
                    <br /> <br />
                    Наші сувеніри – це справжні витвори мистецтва, що втілюють дух
                    української традиції. Кожен предмет, виготовлений умілими руками наших
                    майстрів, є унікальним та неповторним. Ми використовуємо тільки
                    високоякісні матеріали та традиційні методи виготовлення, щоб кожен
                    сувенір був міцним та довговічним.
                </p>
            </div>
            <Image
                src="/images/Group711.png"
                alt="braslets"
                width={213}
                height={471}
                className="hidden md:flex md:absolute md:w-[213px] xl:w-[316px] md:h-[489px] xl:h-[698px] md:right-[62px] xl:right-[34px] md:top-[14px] xl:top-[38px] md:z-10"

            />
        </div>
    );
}

import Image from "next/image";
import React from "react";

export default function AboutUs() {
    return (
        <div className="flex flex-row relative items-center justify-start container" >
            <div className=" mt-28  mr-36 " style={{ width: "520px" }}>
                <Image
                    className="m-auto "
                    src="/images/logo.svg"
                    alt="Логотип MIU Market"
                    width={328}
                    height={198}
                />
                <h1
                    className="flex items-center justify-center text-center gap-2 font-bold mt-14 "
                    style={{ fontSize: "28px" }}
                >
                    <Image
                        src="/images/arrow-left.svg"
                        alt="arrow-left"
                        width={62}
                        height={24}
                    />
                    ПРО НАС
                    <Image
                        src="/images/arrow-right.svg"
                        alt="arrow-right"
                        width={62}
                        height={24}
                    />
                </h1>

                <p className="text-center mx-0 mb-20 mt-2" style={{ fontSize: "18px" }}>
                    Ласкаво просимо у світ унікальних українських сувенірів! Пориньте у
                    багату культуру та спадщину України з нашою колекцією вишуканих
                    сувенірів, створених з любов&#39;ю та майстерністю.
                    <br />
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
                width={315}
                height={698}
                className="absolute right-0 top-14 z-10"

            />
        </div>
    );
}

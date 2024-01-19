import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Parallax, Pagination} from "swiper/modules";
import Image from "next/image";
import ArrowIcon from "./ArrowIcon";
import Link from "next/link";

export default function HeroSlider() {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#3ACCE9",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
      
        modules={[Parallax, Pagination]}
        className="mySwiper "
      >
        <div
          slot="container-start"
          className="parallax-bg "
          style={{
            "backgroundImage":
              "url(https://res.cloudinary.com/dfshhapcu/image/upload/v1704792514/9_1_ycvsae.png)",
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide className="">
          <div className="flex flex-row relative max-w-[425px] md:max-w-[780px] mx-auto xl:max-w-[1440px] xl:mx-auto">
            <div className="absolute top-[415px] right-[78px] md:right-0 md:left-[65px] md:top-[72px] xl:top-0  md:block  xl:ml-[65px] xl:mt-[112px] ">
              <h2
                className="hidden md:flex pb-[26px] md:pb-[18px] uppercase md:text-[34px] md:leading-normal xl:text-[63px] font-bold text-white leading-[62px] w-[358px] text-left "
                data-swiper-parallax="-200"
              >
                {" "}
                обирай українське
              </h2>

              <Link
                href="/product/bracelet-emblem-sword-green"
                className="uppercase bg-black text-white fill-white hover:fill-black hover:text-black text-[15px]  xl:text-[18px] hover:bg-primary flex flex-row justify-center items-center gap-[10px] px-[15px]  py-[15px] rounded-[10px] md:w-[250px] xl:w-[310px]"
              >
                перейти до товару <ArrowIcon />
              </Link>
            </div>

            <div
              className="w-[375px] h-[258px] xl:w-[389px] xl:h-[428px] absolute md:right-[114px] xl:right-[417px] top-0 md:top-[30px] xl:top-0 right-[-50px]"
              data-swiivper-parallax="-200"
            >
              <Image
                src="https://res.cloudinary.com/dfshhapcu/image/upload/v1704874703/1-logo_ohg7pn.png"
                width={245}
                height={250}
                alt="logo"
                className="w-[245px] h-[250px] md:w-[256px] md:h-[280px] xl:w-[389px] xl:h-[428px]"
              />
            </div>
            <div className="absolute  text-center md:text-justify top-[250px] md:top-[80px]  xl:top-[120px]  right-[40px] md:right-[48px] xl:right-[98px] ">
              <h3
                className="font-bold text-[24px] xl:text-[30px] leading-6 uppercase mx-auto md:mx-0  w-[165px] xl:w-[173px] pb-[17px] xl:pb-[20px] "
                data-swiper-parallax="-200"
              >
                Браслет плетений
              </h3>

              <p
                className="text-[15px] md:text-[14px] xl:text-[18px] leading-[15px]  xl:leading-[20px] w-[297px] md:w-[180px] xl:w-[297px]"
                data-swiper-parallax="-100"
              >
                Цей браслет, виготовлений з міцного паракорда, увібрав в себе
                дух відваги та стійкості. Він прикрашений воєнною гільзою, що
                служила в гарячій точці, додавши йому унікальності та історичної
                цінності.
              </p>
            </div>
          </div>
        </SwiperSlide>


        {/* <SwiperSlide className="">
          <div className="flex flex-row relative max-w-[425px] md:max-w-[780px] mx-auto xl:max-w-[1440px] xl:mx-auto">
            <div className="absolute top-[415px] right-[78px] md:right-0 md:left-[65px] md:top-[72px] xl:top-0  md:block  xl:ml-[65px] xl:mt-[112px] ">
              <h2
                className="hidden md:flex pb-[26px] md:pb-[18px] uppercase md:text-[34px] md:leading-normal xl:text-[63px] font-bold text-white leading-[62px] w-[358px] text-left "
                data-swiper-parallax="-200"
              >
                {" "}
                обирай українське
              </h2>

              <Link
                href="/product/bracelet-emblem-sword-green"
                className="uppercase bg-black text-white fill-white hover:fill-black hover:text-black text-[15px]  xl:text-[18px] hover:bg-primary flex flex-row justify-center items-center gap-[10px] px-[15px]  py-[15px] rounded-[10px] md:w-[250px] xl:w-[310px]"
              >
                перейти до товару <ArrowIcon />
              </Link>
            </div>

            <div
              className="w-[375px] xl:w-[666px] h-[258px]  xl:h-[428px] absolute md:right-[114px] xl:right-[262px] top-0 md:top-[30px] xl:top-0 right-[-50px]"
              data-swiivper-parallax="-200"
            >
              <Image
                src="https://res.cloudinary.com/dfshhapcu/image/upload/v1704874701/1-logo_3_pv1ppj.png"
                width={245}
                height={250}
                alt="logo"
                className="w-[245px] h-[250px] md:w-[256px] md:h-[280px] xl:w-[666px] xl:h-[500px]"
              />
            </div>
            <div className="absolute  text-center md:text-justify top-[250px] md:top-[80px]  xl:top-[120px]  right-[40px] md:right-[48px] xl:right-[98px] ">
              <h3
                className="font-bold text-[24px] xl:text-[30px] leading-6 uppercase mx-auto md:mx-0  w-[165px] xl:w-[173px] pb-[17px] xl:pb-[20px] "
                data-swiper-parallax="-200"
              >
                янгол великий
              </h3>

              <p
                className="text-[15px] md:text-[14px] xl:text-[18px] leading-[15px]  xl:leading-[20px] w-[297px] md:w-[180px] xl:w-[297px]"
                data-swiper-parallax="-100"
              >
                Цей браслет, виготовлений з міцного паракорда, увібрав в себе
                дух відваги та стійкості. Він прикрашений воєнною гільзою, що
                служила в гарячій точці, додавши йому унікальності та історичної
                цінності.
              </p>
            </div>
          </div>
        </SwiperSlide>


        <SwiperSlide className="">
          <div className="flex flex-row relative max-w-[425px] md:max-w-[780px] mx-auto xl:max-w-[1440px] xl:mx-auto">
            <div className="absolute top-[415px] right-[78px] md:right-0 md:left-[65px] md:top-[72px] xl:top-0  md:block  xl:ml-[65px] xl:mt-[112px] ">
              <h2
                className="hidden md:flex pb-[26px] md:pb-[18px] uppercase md:text-[34px] md:leading-normal xl:text-[63px] font-bold text-white leading-[62px] w-[358px] text-left "
                data-swiper-parallax="-200"
              >
                {" "}
                обирай українське
              </h2>

              <Link
                href="/product/bracelet-emblem-sword-green"
                className="uppercase bg-black text-white fill-white hover:fill-black hover:text-black text-[15px]  xl:text-[18px] hover:bg-primary flex flex-row justify-center items-center gap-[10px] px-[15px]  py-[15px] rounded-[10px] md:w-[250px] xl:w-[310px]"
              >
                перейти до товару <ArrowIcon />
              </Link>
            </div>

            <div
              className="w-[375px] h-[258px] xl:w-[389px] xl:h-[428px] absolute md:right-[114px] xl:right-[417px] top-0 md:top-[30px] xl:top-0 right-[-50px]"
              data-swiivper-parallax="-200"
            >
              <Image
                src="https://res.cloudinary.com/dfshhapcu/image/upload/v1704874701/1-logo_1_1_odmfpu.png"
                width={245}
                height={250}
                alt="logo"
                className="w-[245px] h-[250px] md:w-[256px] md:h-[280px] xl:w-[389px] xl:h-[428px]"
              />
            </div>
            <div className="absolute  text-center md:text-justify top-[250px] md:top-[80px]  xl:top-[120px]  right-[40px] md:right-[48px] xl:right-[98px] ">
              <h3
                className="font-bold text-[24px] xl:text-[30px] leading-6 uppercase mx-auto md:mx-0  w-[165px] xl:w-[173px] pb-[17px] xl:pb-[20px] "
                data-swiper-parallax="-200"
              >
                Браслет плетений
              </h3>

              <p
                className="text-[15px] md:text-[14px] xl:text-[18px] leading-[15px]  xl:leading-[20px] w-[297px] md:w-[180px] xl:w-[297px]"
                data-swiper-parallax="-100"
              >
                Цей браслет, виготовлений з міцного паракорда, увібрав в себе
                дух відваги та стійкості. Він прикрашений воєнною гільзою, що
                служила в гарячій точці, додавши йому унікальності та історичної
                цінності.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="">
          <div className="flex flex-row relative max-w-[425px] md:max-w-[780px] mx-auto xl:max-w-[1440px] xl:mx-auto">
            <div className="absolute top-[415px] right-[78px] md:right-0 md:left-[65px] md:top-[72px] xl:top-0  md:block  xl:ml-[65px] xl:mt-[112px] ">
              <h2
                className="hidden md:flex pb-[26px] md:pb-[18px] uppercase md:text-[34px] md:leading-normal xl:text-[63px] font-bold text-white leading-[62px] w-[358px] text-left "
                data-swiper-parallax="-200"
              >
                {" "}
                обирай українське
              </h2>

              <Link
                href="/product/bracelet-emblem-sword-green"
                className="uppercase bg-black text-white fill-white hover:fill-black hover:text-black text-[15px]  xl:text-[18px] hover:bg-primary flex flex-row justify-center items-center gap-[10px] px-[15px]  py-[15px] rounded-[10px] md:w-[250px] xl:w-[310px]"
              >
                перейти до товару <ArrowIcon />
              </Link>
            </div>

            <div
              className="w-[375px] h-[258px] xl:w-[389px] xl:h-[428px] absolute md:right-[114px] xl:right-[417px] top-0 md:top-[30px] xl:top-0 right-[-50px]"
              data-swiivper-parallax="-200"
            >
              <Image
                src="https://res.cloudinary.com/dfshhapcu/image/upload/v1704874701/1-logo_1_vvrhjh.png"
                width={245}
                height={250}
                alt="logo"
                className="w-[245px] h-[250px] md:w-[256px] md:h-[280px] xl:w-[389px] xl:h-[428px]"
              />
            </div>
            <div className="absolute  text-center md:text-justify top-[250px] md:top-[80px]  xl:top-[120px]  right-[40px] md:right-[48px] xl:right-[98px] ">
              <h3
                className="font-bold text-[24px] xl:text-[30px] leading-6 uppercase mx-auto md:mx-0  w-[165px] xl:w-[173px] pb-[17px] xl:pb-[20px] "
                data-swiper-parallax="-200"
              >
                Браслет плетений
              </h3>

              <p
                className="text-[15px] md:text-[14px] xl:text-[18px] leading-[15px]  xl:leading-[20px] w-[297px] md:w-[180px] xl:w-[297px]"
                data-swiper-parallax="-100"
              >
                Цей браслет, виготовлений з міцного паракорда, увібрав в себе
                дух відваги та стійкості. Він прикрашений воєнною гільзою, що
                служила в гарячій точці, додавши йому унікальності та історичної
                цінності.
              </p>
            </div>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}

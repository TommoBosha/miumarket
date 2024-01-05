"use client"
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Thumbs } from 'swiper/modules';
import 'swiper/css';

import 'swiper/css/thumbs';
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export default function ProductSlider({ images }) {
  const mainSwiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);
  const isDesktope = useMediaQuery({ query: "(min-width: 1280px)" });

  const size = isDesktope ? "21px" : "10px";

  return (
    <div className="">
      <Swiper
        modules={[ Thumbs]}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiperRef.current }}
        onSwiper={swiper => mainSwiperRef.current = swiper}
        className="w-[333px]  h-[319px] "
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="w-[333px] h-[319px]">
            <Image src={image} alt={`Slide ${index + 1}`} width={333} height={319} objectFit="cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        onSwiper={swiper => thumbsSwiperRef.current = swiper}
        spaceBetween={size}
        slidesPerView={3}
        watchSlidesProgress
        className="w-[78px] h-[78px]   mt-[12px] md:mt-[17px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image src={image} alt={`Thumbnail ${index + 1}`} width={78} height={78} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
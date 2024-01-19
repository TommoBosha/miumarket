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
  

  const size = isDesktope ? "21px" : "12px";
  const mainImageSize = isDesktope ? { width: 502, height: 397 } : { width: 333, height: 319 };
  const thumbImageSize = isDesktope ? { width: 160, height: 160 } : { width: 78, height: 78 };

  return (
    <div className="">
      <Swiper
        modules={[ Thumbs]}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiperRef.current }}
        onSwiper={swiper => mainSwiperRef.current = swiper}
        className="min-w-[333px]  min-h-[319px] "
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="w-[333px] h-[319px]">
            <Image src={image} alt={`Slide ${index + 1}`}  width={mainImageSize.width} 
              height={mainImageSize.height} className="object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-[12px] md:mt-[17px] overflow-hidden ">
      <Swiper
        modules={[Thumbs]}
        onSwiper={swiper => thumbsSwiperRef.current = swiper}
        spaceBetween={size}
        slidesPerView={4}
        watchSlidesProgress
        className="max-w-[425px] md:max-w-[1024px] xl:max-w-[1280px] xxl:max-w-[1440px]"
      >
        
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image src={image} alt={`Thumbnail ${index + 1}`} width={thumbImageSize.width} 
              height={thumbImageSize.height} className="object-cover" />
          </SwiperSlide>
        ))}
       
      </Swiper>
    </div>
    </div>
  );
}
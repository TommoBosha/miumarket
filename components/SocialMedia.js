"use client";
import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import "swiper/css/pagination";
import "swiper/css";
import { useMediaQuery } from "react-responsive";
import YouTube from "react-youtube";

export default function SocialMedia() {
  const [isClient, setIsClient] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  const slidesPerView = isTablet ? 2 : 1;
  const imageSrc = isMobile ? "/images/yellow-mobile.svg" : "/images/yellow.svg";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,

    mode: "free",
    breakpoints: {
      "(min-width: 375px)": {
        slides: { perView: 1 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 2, spacing: 34 },
      },
    },
    slides: {
      perView: slidesPerView,
    },

    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const opts = {
    playerVars: {
      autoplay: 0,
      
    },
    height: "221px",
    width: "100%",
  };
  if (isDesktop) {
    opts.height = "336px";
    opts.width = "502px";
  } else if (isTablet) {
    opts.height = "211px";
    opts.width = "316px";
  }

  const onPlayerReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <div className="bg-yellow-400  w-full   relative ">
        <div className="container xl:max-w-[1282px]">
        <h1 className="uppercase text-center text-[24px] md:text-[27px] xl:text-[30px] leading-normal font-bold py-[15px] md:pt-[43px] xl:pt-[41px] xl:pb-[38px]">
        Відео огляд
      </h1>
      <div className="navigation-wrapper relative z-20">
        {isClient && (
          <div ref={sliderRef} className="keen-slider mx-auto">
            <div className="keen-slider__slide_youtybe keen-slider__slide ">
              <YouTube
                videoId="xeNHslFN9Lk"
                opts={opts}
                onReady={onPlayerReady}
              />
            </div>
            <div className="keen-slider__slide keen-slider__slide_youtybe ">
              <YouTube
                videoId="cNT2i6rLo6k"
                opts={opts}
                onReady={onPlayerReady}
              />
            </div>
            <div className="keen-slider__slide  keen-slider__slide_youtybe">
              <YouTube
                videoId="gmn_3Se49BY"
                opts={opts}
                onReady={onPlayerReady}
              />
            </div>
          </div>
        )}
        {loaded && instanceRef.current && (
          <div className="dots pb-[56px] md:pb-[50px] xl:pb-[65px] relative z-50">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              );
            })}
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
          className=" absolute left-0 bottom-0 z-[2] "
          style={{
            zIndex: 1,
          }}
          priority={true}
        />
      </div>
      )}
        </div>
     
    </div>
  );
}

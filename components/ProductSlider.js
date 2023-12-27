import React from "react"
import { useKeenSlider } from "keen-slider/react"
import Image from "next/image"


function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

export default function ProductSlider({ images }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 1,
      
    },
  
  })
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 3,
        spacing: 20,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  return (
    <div className="container">
      <div ref={sliderRef} className="keen-slider">
      {images.map((image, index) => (
          <div key={index} className="keen-slider__slide">
            <Image src={image} alt={`Slide ${index + 1}`}  width={333} height={319} objectFit="cover" />
          </div>
        ))}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {images.map((image, index) => (
          <div key={index} className="keen-slider__slide">
            <Image src={image} alt={`Slide ${index + 1}`} width={78} height={78} />
          </div>
        ))}
      </div>
    </div>
  )
}

import React, { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import ReactPlayer from "react-player"
import styled from "styled-components";


export default function SocialMedia() {

    const [isClient, setIsClient] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setIsClient(true);
        console.log(setIsClient)
    }, []);


    const Header = styled.h1`
     text-align: center;
     font-size: 28px;
 font-style: normal;
 font-weight: 700;
 line-height: normal;
 text-transform: uppercase;
 margin: 20px 0 25px`;



    const [sliderRef, instanceRef] = useKeenSlider({
        mode: "free-snap",
        slides: {
            origin: "center",
            perView: 2,
            spacing: 15,

        },
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    return (
        <div className="bg-yellow-400  pb-24 pt-5">

            <Header>Відео огляд</Header>
            <div className="navigation-wrapper ">
                {isClient && (
                    <div ref={sliderRef} className="keen-slider">
                        <div className="keen-slider__slide ">
                            <ReactPlayer
                                url={"https://youtube.com/shorts/cNT2i6rLo6k?si=BPWYt-IBse_4_D1g"}
                            /* width={"316"} */

                            />
                        </div>
                        <div className="keen-slider__slide ">
                            <ReactPlayer
                                url={"https://youtube.com/shorts/xeNHslFN9Lk?si=0m7XzVyXWFUb0lLy"}
                            /* width={"316"} */


                            />
                        </div>
                        <div className="keen-slider__slide ">
                            <ReactPlayer
                                url={"hhttps://youtube.com/shorts/gmn_3Se49BY?si=OEDXKk1AD4DhNfgU"}
                            /* width={"316"} */

                            />
                        </div>



                    </div>
                )
                }
                {loaded && instanceRef.current && (
                    <div className="dots">
                        {[
                            ...Array(instanceRef.current.track.details.slides.length).keys(),
                        ].map((idx) => {
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        instanceRef.current?.moveToIdx(idx)
                                    }}
                                    className={"dot" + (currentSlide === idx ? " active" : "")}
                                ></button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>

    )

}

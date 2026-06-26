"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { process } from "@/lib/content";
import { StepCard } from "./ProcessCarousel";

export default function ProcessSwiperInner() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    return () => {
      if (swiperRef.current && !swiperRef.current.destroyed) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, []);

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView={1.05}
        spaceBetween={16}
        centeredSlides={false}
        grabCursor
        speed={700}
        autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          640: { slidesPerView: 1.4, spaceBetween: 18 },
          768: { slidesPerView: 1.8, spaceBetween: 20 },
          1024: { slidesPerView: 2.2, spaceBetween: 22 },
          1280: { slidesPerView: 2.5, spaceBetween: 24 },
        }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.realIndex)}
        className="swiper-no-overflow !px-5 md:!px-10 lg:!px-16"
      >
        {process.steps.map((step) => (
          <SwiperSlide key={step.number} className="!h-auto">
            <StepCard step={step} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container-wide mt-10 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          {process.steps.map((s, i) => (
            <button
              key={s.number}
              type="button"
              onClick={() => swiperRef.current?.slideTo(i)}
              className="group relative h-px w-12 bg-bg/20"
              aria-label={`Ir al paso ${s.number}`}
            >
              <span
                className={`absolute inset-y-0 left-0 bg-bg transition-[width] duration-500 ${
                  active === i ? "w-full" : "w-0 group-hover:w-1/2"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ArrowButton
            direction="prev"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <ArrowButton
            direction="next"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Anterior" : "Siguiente"}
      className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-bg/15 transition-colors hover:bg-bg hover:text-ink"
    >
      <svg
        viewBox="0 0 14 14"
        className={`h-3.5 w-3.5 transition-transform duration-500 ${
          direction === "prev" ? "rotate-180" : ""
        }`}
        aria-hidden="true"
      >
        <path
          d="M2 7 H12 M8 3 L12 7 L8 11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </button>
  );
}

import React, { useState } from "react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/swiper-react.mjs";

// Styles must use direct files imports
import "swiper/modules/navigation.scss"; // Navigation module
import "swiper/modules/pagination.scss"; // Pagination module
import "swiper/swiper.scss"; // core Swiper
import BannerCard from "./BannerCard";

//import './styles.css';

export default function Corousels({ bannerInfo }) {
  const [swiperRef, setSwiperRef] = useState(null);
  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: 12 }).map((_, index) => `Slide ${index + 1}`)
  );

  // const bannerInfo = useBanner();
  return (
    <>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={2}
        centeredSlides={false}
        spaceBetween={10}
        breakpoints={{
          1525: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1499: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1369: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
        // pagination={{
        //   type: "fraction",
        // }}
        navigation={true}
        virtual
      >
        {bannerInfo?.map((info, index) => (
          <SwiperSlide key={index} virtualIndex={index}>
            <BannerCard imageId={info.imageId} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

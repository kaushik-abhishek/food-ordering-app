import useTopRestro from "../utils/useTopRestro";
import RestaurantCard, { withpromotedLabel } from "./RestaurantCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/swiper-react.mjs";

// Styles must use direct files imports
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation.scss"; // Navigation module
import "swiper/modules/pagination.scss"; // Pagination module
import { Link } from "react-router-dom";

const TopRestaurantCarousel = ({ topRestro }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: 12 }).map((_, index) => `Slide ${index + 1}`)
  );

  const RestaurantCardPromoted = withpromotedLabel(RestaurantCard);
  return (
    <>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={2}
        centeredSlides={false}
        spaceBetween={15}
        breakpoints={{
          1525: {
            slidesPerView: 4,
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
        {topRestro?.map((restaurant, index) => (
          <SwiperSlide key={restaurant.info.id} virtualIndex={index}>
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              {
                /* if the restaurant is promoted then add a promote label to it. */
                restaurant.info.aggregatedDiscountInfoV3 === undefined ? (
                  <RestaurantCard resData={restaurant} />
                ) : (
                  <RestaurantCardPromoted resData={restaurant} />
                )
              }
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TopRestaurantCarousel;

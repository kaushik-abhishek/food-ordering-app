import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpZA } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Applyfilters = ({ listOfRestaurants, setFilteredRestaurant }) => {
  const [openPops, setOpenPops] = useState(false);
  return (
    <div className="flex flex-wrap items-center ml-4 gap-3 my-4">
      <button
        className="px-4 py-2 flex items-center rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 text-sm font-semibold text-gray-700"
        onClick={() => setOpenPops(true)}
      >
        <span className="mr-2">Filter</span>
        <FontAwesomeIcon icon={faArrowUpZA} className="text-gray-600" />
      </button>
      {/* <FilterPopsUp open={openPops} onClose={setOpenPops(false)} /> */}
      <button className="px-4 py-2 flex items-center rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 text-sm font-semibold text-gray-700">
        <span className="mr-2">Sort By</span>
        <FontAwesomeIcon icon={faChevronDown} className="text-gray-600" />
      </button>
      <button className="px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 text-sm font-semibold text-gray-700">
        Fast Delivery
      </button>
      <button className="px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 text-sm font-semibold text-gray-700">
        New on Swiggy
      </button>
      <button
        className="px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md hover:bg-primary-light hover:border-primary hover:text-primary transition-all duration-200 text-sm font-semibold text-gray-700"
        onClick={() => {
          const filterRestaurant = listOfRestaurants.filter(
            (res) => res.info.avgRating > 4.2
          );
          setFilteredRestaurant(filterRestaurant);
        }}
      >
        Rating 4.2+
      </button>
      <button className="px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 text-sm font-semibold text-gray-700">
        Pure Veg
      </button>
      <button className="px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 text-sm font-semibold text-gray-700">
        Offers
      </button>
      <button className="px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 text-sm font-semibold text-gray-700">
        Rs.300-Rs.600
      </button>
      <button className="px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 text-sm font-semibold text-gray-700">
        Less than Rs.300
      </button>
    </div>
  );
};

export default Applyfilters;

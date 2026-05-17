import RestaurantMenuShimmer from "../Shimmers/RestaurantMenuShimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar, faLeaf, faDrumstickBite } from "@fortawesome/free-solid-svg-icons";

const RestaurantMenuPage = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null)

  if (resInfo === null) {
    return <RestaurantMenuShimmer />;
  }

  const { name, cuisines, costForTwoMessage, avgRating, totalRatingsString, areaName } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  const offers = resInfo?.cards?.find(c => c?.card?.card?.gridElements?.infoWithStyle?.offers)?.card?.card?.gridElements?.infoWithStyle?.offers || [];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        
        {/* Restaurant Header */}
        <div className="flex justify-between items-end pb-6 border-b border-gray-300 border-dashed mb-6">
          <div>
            <h1 className="font-extrabold text-2xl text-gray-900 mb-2">{name}</h1>
            <p className="text-sm font-semibold text-gray-500 mb-1">{cuisines?.join(", ")}</p>
            <p className="text-sm font-semibold text-gray-500">{areaName}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-2 text-center shadow-sm">
            <div className="text-green-600 font-bold flex items-center justify-center pb-2 border-b border-gray-200 mb-2">
              <FontAwesomeIcon icon={faStar} className="mr-1" />
              <span>{avgRating}</span>
            </div>
            <div className="text-xs font-bold text-gray-500">
              {totalRatingsString || "1K+ ratings"}
            </div>
          </div>
        </div>

        {/* Deals Carousel */}
        {offers.length > 0 && (
          <div className="mb-10">
            <h2 className="font-extrabold text-xl text-gray-800 mb-4">Deals for you</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
              {offers.map((offer, index) => (
                <div key={index} className="flex-shrink-0 w-[300px] border border-gray-200 rounded-2xl p-4 flex items-center shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-black text-blue-600 text-lg">%</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{offer.info.header}</h3>
                    <p className="text-xs font-bold text-gray-500 mt-1">{offer.info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MENU Separator */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-gray-300 w-12"></div>
          <span className="mx-4 font-bold text-gray-400 tracking-widest text-sm">M E N U</span>
          <div className="h-px bg-gray-300 w-12"></div>
        </div>

        {/* Search Bar Placeholder */}
        <div className="relative mb-6">
          <input
            type="text"
            className="w-full h-12 bg-gray-100 rounded-xl pl-4 pr-12 outline-none font-medium text-gray-700 placeholder-gray-500 text-center"
            placeholder="Search for dishes"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <span className="inline-block w-4 h-4 border-2 border-green-600 p-[2px] rounded-sm flex items-center justify-center mr-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            </span>
            <span className="font-semibold text-sm text-gray-700">Veg</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <span className="inline-block w-4 h-4 border-2 border-red-600 p-[2px] rounded-sm flex items-center justify-center mr-2">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            </span>
            <span className="font-semibold text-sm text-gray-700">Non Veg</span>
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-full font-semibold text-sm text-gray-700 shadow-sm hover:shadow-md transition-shadow">
            Bestseller
          </button>
        </div>

        {/* Categories Accordion */}
        <div className="border-t-[16px] border-gray-100 -mx-4 px-4 pt-4">
          {categories.map((category, index) => (
            <RestaurantCategory
              key={category?.card?.card?.title}
              data={category?.card?.card}
              showItems={index === showIndex ? true : false}
              setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
export default RestaurantMenuPage;

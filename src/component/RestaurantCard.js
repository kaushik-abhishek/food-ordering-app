import UserContext from "../utils/UserContext";
import { CDN_LINK } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  // const { loggedInUser } = useContext(UserContext);

  const { cloudinaryImageId, name, cuisines, avgRating, areaName } =
    resData?.info;

  const { deliveryTime } = resData?.info.sla;

  return (
    <div className="p-4 w-full h-full rounded-2xl hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer bg-white group flex flex-col">
      <div>
        <img
          alt="res-logo"
          className="res-logo rounded-2xl h-[180px] w-full object-cover group-hover:opacity-95 transition-opacity duration-300 shadow-sm"
          src={CDN_LINK + cloudinaryImageId}
        />
      </div>
      <div className="mt-3 flex-grow flex flex-col justify-start">
        <h3 className="font-bold py-3 text-lg text-gray-800 line-clamp-1">{name}</h3>
        <div className="flex items-center text-sm font-semibold text-gray-700">
          <span className="flex items-center justify-center bg-green-600 text-white rounded-full w-5 h-5 mr-1 shadow-sm">
            <img
              className="w-3"
              src="https://img.icons8.com/material-rounded/24/ffffff/star--v1.png"
              alt="star"
            />
          </span>
          {avgRating}
          <span className="mx-2 text-gray-400">•</span>
          <span>{deliveryTime} mins</span>
        </div>
        <p className="py-2 text-sm text-gray-500 line-clamp-1">{cuisines.join(", ")}</p>
        <p className="py-1 text-sm text-gray-500 font-medium">{areaName}</p>
        {/* <h4 className="py-1">Offers: {costForTwo}</h4> */}

        {/* <h4>User: {loggedInUser}</h4> */}
      </div>
    </div>
  );
};

// Higher Order Component

//input - RestaurantCard => RestaurantCardPromoted

export const withpromotedLabel = (RestaurantCard) => {
  return (props) => {
    const { resData } = props;

    const { header, subHeader } = resData?.info?.aggregatedDiscountInfoV3;
    return (
      <div className="relative group">
        <div className="font-extrabold text-white absolute left-4 right-4 top-[150px] p-2 text-center rounded-b-2xl bg-gradient-to-t from-black/90 via-black/60 to-transparent tracking-wide text-[15px] opacity-100 z-10 pointer-events-none uppercase">
          {header} {subHeader}
        </div>
        {/* <RestaurantCard resData={resData} /> */}

        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;

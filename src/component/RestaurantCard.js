import UserContext from "../utils/UserContext";
import { CDN_LINK } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  // const { loggedInUser } = useContext(UserContext);

  const { cloudinaryImageId, name, cuisines, avgRating, areaName } =
    resData?.info;

  const { deliveryTime } = resData?.info.sla;

  return (
    <div className="p-4 w-[280px] rounded-lg hover:scale-110 transition ease-in-out delay-150">
      <div>
        <img
          alt="res-logo"
          className="res-logo rounded-lg h-[175px] w-[700px]"
          src={CDN_LINK + cloudinaryImageId}
        />
      </div>
      <div className="ml-4">
        <h3 className="font-extrabold py-4 text-xl">{name}</h3>
        <h4 className="flex items-center">
          <img
            className="w-6 mr-2"
            src="https://img.icons8.com/flat-round/64/000000/star--v1.png"
            alt="star--v1"
          />
          Ratings: {avgRating}
          <div className="ml-2 h-1 w-1 rounded-lg bg-black mx-2"></div>
          <h4>{deliveryTime}mins</h4>
        </h4>
        <h4 className="py-1 w-[200px] truncate">{cuisines.join(", ")}</h4>
        <h4 className="py-1">{areaName}</h4>
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
      <div className="relative">
        <div className="font-black text-white absolute m-4 p-2 top-[135px] w-[248px] text-center rounded-lg bg-gradient-to-t from-gray-950">
          {header} {subHeader}
        </div>
        {/* <RestaurantCard resData={resData} /> */}

        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;

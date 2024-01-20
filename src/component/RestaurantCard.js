import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/userContext";
const RestaurantCard = (props) => {

  const {loggedInUser} = useContext(UserContext);

  const { resData } = props;
  const {
    name,
    cuisines,
    costForTwo,
    avgRating,
    deliveryTime,
    cloudinaryImageId,
  } = resData?.info;
  return (
    <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-150 hover:bg-gray-200">
      <img className="rounded-lg" src={CDN_URL + cloudinaryImageId} />
      <h3 className="font-bold py-4 text-xl">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>₹{costForTwo / 100} FOR TWO </h4>
      <h4>{deliveryTime} minutes</h4>
      <h4>User: {loggedInUser}</h4>
    </div>
  );
};

export const withPromotedLabel = () => {
  return (props) => {
    return (
      <div>
      <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
      <RestaurantCard {...props} />
      </div>
    )
  };
};
export default RestaurantCard;

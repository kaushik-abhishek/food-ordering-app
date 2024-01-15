import { CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
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
    </div>
  );
};
export default RestaurantCard;

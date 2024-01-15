import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfResturants, setListOfRestaurants] = useState([]);
  const [filteredResturant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    //console.log(json);

    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // console.log(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h2>You are offline.</h2>;
  }

  if (listOfResturants.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4 rounded-lg ">
          <input
            type="text"
            className="border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4"
            onClick={() => {
              //filter restaurant card and update the UI
              console.log(searchText);
              const filteredResturant = listOfResturants.filter((res) =>
                res?.info?.name
                  ?.toLowerCase()
                  ?.includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredResturant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center rounded-lg">
          <button
            className="px-4 py-2 bg-gray-100 m-4"
            onClick={() => {
              const filteredList = listOfResturants.filter(
                (res) => res?.info?.avgRating > 4
              );
              setListOfRestaurants(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredResturant?.map((restaurant) => (
          <Link
            key={restaurant?.info?.id}
            to={"/restaurants/" + restaurant?.info?.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

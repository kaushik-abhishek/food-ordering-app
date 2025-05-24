import { Swiggy_API } from "./constants";
import { useState, useEffect } from "react";

const useListOfRestro = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(Swiggy_API);
    const json = await data.json();

    // const array1 = json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    // const array2 =
    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return listOfRestaurants;
};

export default useListOfRestro;

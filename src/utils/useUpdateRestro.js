import { useState, useEffect } from "react";

const useUpdateRestro = () => {
  const [updateRes, setUpdateRes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/update"
    );

    const json = await data.json();

    setUpdateRes(
      json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  return updateRes;
};

export default useUpdateRestro;
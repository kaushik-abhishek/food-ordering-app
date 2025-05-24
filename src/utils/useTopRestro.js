import { useState, useEffect } from "react";
import { Swiggy_API } from "./constants";

const useTopRestro = () => {
  const [topRestro, setTopRestro] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(Swiggy_API);

    const json = await data.json();

    setTopRestro(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return topRestro;
};

export default useTopRestro;

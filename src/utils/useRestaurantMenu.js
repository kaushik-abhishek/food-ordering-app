import { useEffect, useState } from "react";
import { MENU_API1, MENU_API2 } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);
  const fetchMenu = async () => {
    const data = await fetch(MENU_API1 + resId + MENU_API2);
    const json = await data.json();

    //console.log(json.data?.cards[0]?.card?.card?.info?.name);
    setResInfo(json.data);
  };
  return resInfo;
};
export default useRestaurantMenu;

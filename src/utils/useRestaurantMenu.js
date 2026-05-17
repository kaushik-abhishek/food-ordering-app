import { useEffect, useState } from "react";
import { MENU_API1, MENU_API2 } from "./constants";
import mockMenuData from "./mockMenu.json";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);
  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API1 + resId + MENU_API2);
      
      // If response is not ok or it's a 202 Accepted (Swiggy bot block), throw to fallback
      if (!data.ok || data.status === 202) {
        throw new Error("Swiggy API blocked the request (CORS/Bot protection). Using fallback.");
      }
      
      const json = await data.json();
      
      if (!json.data) {
        throw new Error("Invalid JSON structure returned. Using fallback.");
      }
      
      setResInfo(json.data);
    } catch (error) {
      console.warn("Falling back to local mock menu data due to error: ", error.message);
      // Fallback to local mock data so the app doesn't break
      setResInfo(mockMenuData.data);
    }
  };
  return resInfo;
};
export default useRestaurantMenu;

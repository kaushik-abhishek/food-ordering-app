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
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get("query");
      const metaData = urlParams.get("metaData");

      let apiUrl = MENU_API1 + resId + MENU_API2;
      
      // If the user clicked a specific dish from search, append the filtered API params
      if (query && metaData) {
        apiUrl = `/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}&catalog_qa=undefined&query=${encodeURIComponent(query)}&metaData=${encodeURIComponent(metaData)}&submitAction=SUGGESTION`;
      }

      const data = await fetch(apiUrl);
      
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

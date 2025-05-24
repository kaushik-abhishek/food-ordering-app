import { useEffect, useState } from "react";
import { Swiggy_API } from "./constants";

const useBanner = () => {
  const [bannerInfo, setBannerInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(Swiggy_API);
    const json = await data.json();
    
    setBannerInfo(
      json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
    );
  };

  return bannerInfo;
};

export default useBanner;

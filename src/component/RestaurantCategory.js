import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex, dummy }) => {
  //console.log(data);
  // const [showItems, setShowItems] = useState(false);
  const handleClick = () => {
    //    setShowItems(!showItems);
    setShowIndex();
  };
  return (
    <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 ">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        {/*Header section */}
        <span className="font-bold text-lg">
          {data.title} ({data?.itemCards?.length})
        </span>
        <span>🔽</span>
      </div>
      {/*Accordion section*/}
      {showItems && <ItemList items={data?.itemCards} dummy = {dummy} />}
    </div>
  );
};
export default RestaurantCategory;

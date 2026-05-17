import ItemList from "./ItemList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };
  console.log(data);
  return (
    <div>
      {/* Header */}
      <div className="w-full mx-auto my-2 bg-white pt-6 pb-2 border-b-8 border-gray-100 last:border-b-0">
        <div
          className="flex justify-between items-center cursor-pointer px-4"
          onClick={handleClick}
        >
          <span className="font-extrabold text-[19px] text-gray-800">
            {data.title} ({data.itemCards.length})
          </span>
          <span className="text-gray-500">
            {showItems ? (
              <FontAwesomeIcon icon={faChevronUp} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} size="lg" />
            )}
          </span>
        </div>
        <div className="px-4 mt-2">
          {showItems && <ItemList items={data.itemCards} />}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCategory;

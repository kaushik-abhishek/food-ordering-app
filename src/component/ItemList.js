import { useDispatch } from "react-redux";
import { RES_IMG_URL } from "../utils/constants";
import { addItems } from "../utils/cartSlice";


const ItemList = ({ items }) => {


  const dispatch = useDispatch();
  const handleItem = (item) => {
    //dispatch an action
    dispatch(addItems(item));
  }
  return (
    <div>
      {items.map((item) => {
        const info = item.card.info;
        return (
          <div
            key={info.id}
            className="py-8 border-b border-gray-200 text-left flex justify-between items-start last:border-b-0"
          >
            {/* Dish Info */}
            <div className="flex-1 pr-4">
              {/* Veg/Non-Veg Icon */}
              {info.isVeg === 1 || info.isVeg ? (
                <span className="inline-block w-4 h-4 border-2 border-green-600 p-[2px] rounded-sm flex items-center justify-center mb-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                </span>
              ) : (
                <span className="inline-block w-4 h-4 border-2 border-red-600 p-[2px] rounded-sm flex items-center justify-center mb-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                </span>
              )}
              
              <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{info.name}</h3>
              <p className="font-semibold text-gray-800 text-sm mb-3">
                ₹{info.price ? info.price / 100 : info.defaultPrice / 100}
              </p>
              
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{info.description}</p>
            </div>

            {/* Dish Image & ADD Button */}
            <div className="w-[140px] h-[120px] flex-shrink-0 relative ml-4">
              {info.imageId ? (
                <img
                  src={RES_IMG_URL + info.imageId}
                  alt={info.name}
                  className="w-full h-full object-cover rounded-2xl shadow-sm"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
              <button
                className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 px-8 py-2 bg-white text-green-600 font-extrabold text-[15px] rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all uppercase"
                onClick={() => handleItem(item)}
              >
                ADD
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;

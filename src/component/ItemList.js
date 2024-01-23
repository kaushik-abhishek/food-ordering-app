import { useDispatch } from "react-redux";
import { RES_IMG_URL } from "../utils/constants";
import { addItems } from "../utils/cartSlice";


const ItemList = ({ items, dummy }) => {

//    console.log(dummy);
  //console.log(items);

  const dispatch = useDispatch();
  const handleItem = (item) => {
    //dispatch an action
    dispatch(addItems(item));
  }
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute">
              <button className="mx-8 rounded-lg p-1 bg-black text-white shadow-lg" onClick={() => handleItem(item)}>ADD+</button>
            </div>
            <img
              src={RES_IMG_URL + item.card.info.imageId}
              className="w-full"
            ></img>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;

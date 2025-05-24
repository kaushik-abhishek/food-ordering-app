import { useEffect, useState } from "react";
import useBanner from "../utils/useBanner";
import useCusines from "../utils/useCuisines"; 
import useTopRestro from "../utils/useTopRestro";
import { Link } from "react-router-dom";
import ShimmerUI from "../Shimmers/ShimmerUI";
import RestaurantCard, { withpromotedLabel } from "./RestaurantCard";
// import UserContext from "../utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Corousels from "./Corousels";
import CorouselCusines from "./CorouselCusines";
import TopRestaurantCarousels from "./TopRestaurantCarousels";
import Applyfilters from "./Applyfilters";
import { Swiggy_API } from "../utils/constants";
import useListOfRestro from "../utils/useListOfRestro";
import useUpdateRestro from "../utils/useUpdateRestro";
// import Footer from "./Footer";

const Body = () => {
  //local state variable - super powerful variable
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withpromotedLabel(RestaurantCard);
  //when state variable update, react trigger reconciliation cycle(re-renders the component)
  // console.log("Body Rendered", listOfRestaurants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(Swiggy_API);
    const json = await data.json(); //converting data into json;
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  //custom hook
  const bannerInfo = useBanner();
  const cusinesInfo = useCusines();
  const topRestro = useTopRestro();
  const listOfRestaurants = useListOfRestro();
  // const updateRes = useUpdateRestro();

  // const allRestro = listOfRestaurants.concat(updateRes);
  // console.log(allRestro);
  // console.log(listOfRestaurants);
  // console.log(updateRes);

  // const { loggedInUser, setUserName } = useContext(UserContext);
  console.log("bannerInfo", bannerInfo);
  return bannerInfo.length === 0 &&
    cusinesInfo.length === 0 &&
    topRestro.length === 0 &&
    listOfRestaurants.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="body w-9/12 mx-auto">
      {/* {bannerInfo.length !== 0 && (
        <h1 className="text-3xl font-bold my-4 ml-6">Best offers for you</h1>
      )}
      {bannerInfo.length !== 0 && <Corousels bannerInfo={bannerInfo} />} */}
      <h1 className="text-3xl font-bold my-4 ml-6">What's in your mind?</h1>
      {/* 2nd crousel */}
      <CorouselCusines cusinesInfo={cusinesInfo} />
      <hr className="w-12/12 h-[0.08rem] mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-200 mt-10" />
      <h1 className="text-3xl font-bold my-4 ml-6">
        Top restaurant chains in Bangalore
      </h1>
      <TopRestaurantCarousels topRestro={topRestro} />
      <hr className="w-12/12 h-[0.08rem] mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-200 mt-10" />
      <h1 className="text-3xl font-bold my-4 ml-6">
        Restaurants with online food delivery in Bangalore
      </h1>
      <Applyfilters
        setFilteredRestaurant={setFilteredRestaurant}
        listOfRestaurants={listOfRestaurants}
      />
      {/* <FilterPopsUp /> */}
      <div className="flex items-center">
        <div className="search m-2 p-2">
          <input
            type="text"
            className="border shadow-md h-[40px] w-[250px] rounded-2xl p-4 outline-none text-base font-semibold text-gray-600"
            value={searchText}
            placeholder="Search me (It works !!!)"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-2 py-2 rounded-2xl border border-solid mx-4 bg-white shadow-md"
            onClick={() => {
              console.log(searchText);
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                //lowering the case of input and api value
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              // console.log(filteredRestaurant);

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            <span className="mr-2">Search</span>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />
          </button>
        </div>
        {/* Code for ratings */}
        {/* <div className="search m-2 p-2 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating < 4
              );
              setListOfRestaurants(filteredList);
            }}
          >
            <h4>Filter by 3 Rating</h4>
          </button>
        </div> */}
        {/* <div className="search m-2 p-2 flex items-center">
          <label className="p-2">Username: </label>
          <input
            className="border border-black p-2 rounded-xl"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div> */}
      </div>
      {/* safasdf */}

      <br />
      <div className="flex flex-wrap">
        {filteredRestaurant?.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
            className="card-ts"
          >
            {
              /* if the restaurant is promoted then add a promote label to it. */
              restaurant.info.aggregatedDiscountInfoV3 === undefined ? (
                <RestaurantCard resData={restaurant} />
              ) : (
                <RestaurantCardPromoted resData={restaurant} />
              )
            }
          </Link>
        ))}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Body;

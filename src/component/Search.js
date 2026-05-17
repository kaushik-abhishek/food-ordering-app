import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSpinner, faStar, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import mockSearchResults from "../utils/mockSearchResults.json";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we already have results, don't fetch suggestions unless user types something new
    if (searchResults) return;

    const timer = setTimeout(() => {
      if (searchText.trim().length > 1) {
        fetchSearchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const fetchSearchSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Using our local proxy to avoid CORS
      const url = `/dapi/restaurants/search/suggest?lat=12.9715987&lng=77.5945627&str=${encodeURIComponent(
        searchText
      )}&trackingId=undefined&includeIMItem=true`;
      
      const response = await fetch(url);
      
      if (!response.ok || response.status === 202) {
        throw new Error("API request blocked or failed");
      }
      
      const json = await response.json();
      
      // Swiggy usually returns suggestions in json.data.suggestions
      if (json?.data?.suggestions) {
        setSuggestions(json.data.suggestions);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Search API Error:", err);
      setError("Unable to fetch suggestions. Please try again.");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchText(suggestion.text);
    setSuggestions([]);
    setIsSearching(true);
    setError(null);
    setSearchResults(null);

    try {
      // Create metadata string safely
      let metaDataStr = "";
      if (suggestion.metadata) {
        metaDataStr = typeof suggestion.metadata === "string" ? suggestion.metadata : JSON.stringify(suggestion.metadata);
      } else {
        // Fallback generic metadata if none provided by suggest API
        metaDataStr = `{"type":"DISH","businessCategory":"SWIGGY_FOOD","displayLabel":"Dish"}`;
      }

      const url = `/dapi/restaurants/search/v3?lat=12.9715987&lng=77.5945627&str=${encodeURIComponent(
        suggestion.text
      )}&trackingId=undefined&submitAction=SUGGESTION&metaData=${encodeURIComponent(metaDataStr)}`;

      const response = await fetch(url);

      if (!response.ok || response.status === 202) {
        throw new Error("API blocked or failed");
      }

      const json = await response.json();
      
      // Look for dishes in the complex Swiggy structure
      const cardsObj = json?.data?.cards?.find(c => c?.groupedCard?.cardGroupMap?.DISH)?.groupedCard?.cardGroupMap?.DISH?.cards;
      
      if (cardsObj) {
        setSearchResults(cardsObj);
      } else {
        // If not found, throw to fallback
        throw new Error("No dish data found in response structure");
      }

    } catch (err) {
      console.warn("Falling back to mock search results due to error:", err.message);
      // Fallback to mock data
      const mockCards = mockSearchResults.data.cards[0].groupedCard.cardGroupMap.DISH.cards;
      setSearchResults(mockCards);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setSearchText("");
    setSuggestions([]);
    setSearchResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Search Input */}
        <div className="relative search flex items-center shadow-md rounded-full overflow-hidden border border-gray-200 bg-white focus-within:shadow-lg focus-within:border-primary transition-all duration-300 w-full mb-8">
          {searchResults && (
            <button onClick={handleClear} className="pl-6 text-gray-500 hover:text-primary transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
          )}
          <input
            type="text"
            className="w-full h-14 pl-6 pr-4 outline-none text-lg font-medium text-gray-700 bg-transparent placeholder-gray-400"
            placeholder="Search for restaurants and food..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              if (searchResults) setSearchResults(null);
            }}
            autoFocus
          />
          <div className="h-14 px-6 text-gray-400 flex items-center justify-center bg-transparent">
            {(isLoading || isSearching) ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-primary" size="lg" />
            ) : (
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-500 font-medium my-4 p-4 bg-red-50 rounded-xl">
            {error}
          </div>
        )}

        {/* Search Suggestions */}
        {suggestions.length > 0 && !searchResults && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="px-6 py-4 text-gray-800 font-bold text-lg border-b border-gray-50 bg-gray-50/50">
              Suggestions
            </h3>
            <ul className="divide-y divide-gray-50">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="hover:bg-orange-50/50 transition-colors duration-200 cursor-pointer group"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center px-6 py-4">
                    {suggestion.cloudinaryId ? (
                      <img
                        src={CDN_URL + suggestion.cloudinaryId}
                        alt={suggestion.text}
                        className="w-16 h-16 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </div>
                    )}
                    <div className="ml-4 flex flex-col justify-center">
                      <span className="text-gray-800 font-semibold text-lg group-hover:text-primary transition-colors">
                        {suggestion.text}
                      </span>
                      <span className="text-gray-500 text-sm font-medium capitalize mt-0.5">
                        {suggestion.type?.toLowerCase() || suggestion.tagToDisplay || "Suggestion"}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Empty State */}
        {searchText.trim().length > 1 && !isLoading && !isSearching && suggestions.length === 0 && !searchResults && !error && (
          <div className="text-center text-gray-500 mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-4xl text-gray-300 mb-4" />
            <p className="text-lg font-medium">No results found for "{searchText}"</p>
            <p className="text-sm mt-2 text-gray-400">Try searching for something else.</p>
          </div>
        )}

        {/* Search Results Display (Dishes) */}
        {searchResults && (
          <div className="mt-6">
            <div className="flex border-b border-gray-200 mb-6">
              <button className="px-6 py-3 font-bold text-lg border-b-2 border-primary text-gray-800">
                Dishes
              </button>
              {/* <button className="px-6 py-3 font-semibold text-lg text-gray-500 hover:text-gray-800">
                Restaurants
              </button> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.map((item, index) => {
                const info = item?.card?.card?.info;
                const restaurant = item?.card?.card?.restaurant?.info;
                if (!info || !restaurant) return null;

                return (
                  <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between group">
                    {/* Restaurant Info */}
                    <Link 
                      to={`/restaurants/${restaurant.id}?query=${encodeURIComponent(searchText)}&metaData=${encodeURIComponent(typeof item?.card?.card?.info?.meta === 'string' ? item.card.card.info.meta : JSON.stringify(item?.card?.card?.info?.meta || {}))}`} 
                      className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50 border-dashed cursor-pointer group/link hover:bg-gray-50/50 -mx-5 px-5 -mt-5 pt-5 rounded-t-2xl transition-colors"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-gray-600 line-clamp-1 group-hover/link:text-primary transition-colors">{restaurant.name}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1 font-semibold">
                          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                          <span>{restaurant.avgRating}</span>
                          <span className="mx-1">•</span>
                          <span>{restaurant.sla?.slaString || "30 MINS"}</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-orange-100 transition-colors">
                        <FontAwesomeIcon icon={faArrowLeft} className="text-gray-400 rotate-135 group-hover/link:text-primary transition-colors" />
                      </div>
                    </Link>

                    {/* Dish Info */}
                    <div className="flex justify-between gap-4">
                      <div className="flex-1">
                        {info.isVeg ? (
                          <span className="inline-block w-4 h-4 border-2 border-green-600 p-[2px] rounded-sm flex items-center justify-center mb-1">
                            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                          </span>
                        ) : (
                          <span className="inline-block w-4 h-4 border-2 border-red-600 p-[2px] rounded-sm flex items-center justify-center mb-1">
                            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                          </span>
                        )}
                        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{info.name}</h3>
                        <p className="font-semibold text-gray-700 text-sm">₹{info.price ? info.price / 100 : 150}</p>
                        
                        <button className="mt-4 px-6 py-2 bg-white text-green-600 font-extrabold text-sm rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
                          ADD
                        </button>
                      </div>
                      
                      <div className="w-32 h-32 flex-shrink-0 relative">
                        <img 
                          src={CDN_URL + info.imageId} 
                          alt={info.name}
                          className="w-full h-full object-cover rounded-xl shadow-sm"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Search;

import React, { useState } from "react";
import { Google_api_keys } from "../utils/constants";

export const Location = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  const handleFindMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Google_api_keys}`
            );
            const data = await response.json();
            if (data.results.length > 0) {
              setAddress(data.results[0].formatted_address);
            } else {
              setAddress("Address not found");
            }
          } catch (error) {
            setError("Error fetching address");
          }
        },
        (error) => {
          setError("Error retrieving location");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex items-center">
      {/* Aligns items to the center */}
      <button
        className="flex flex-col items-start group whitespace-nowrap"
        onClick={handleFindMe}
      >
        <div className="flex items-center text-gray-800 font-bold group-hover:text-primary transition-colors">
          <span className="border-b-2 border-gray-800 group-hover:border-primary pb-0.5">Find your area</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
        {address && (
          <p className="address text-sm text-justify">Address: {address}</p>
        )}
        {error && <p className="error text-sm text-justify">{error}</p>}
      </button>
    </div>
  );
};

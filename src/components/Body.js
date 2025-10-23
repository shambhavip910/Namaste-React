import RestaurantCard from "./ReataurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listofrestaurant, selistofrestaurant] = useState([]);
  const [filteredrestaurant, setFilteredrestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [nextOffset, setNextOffset] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=25.4077022&lng=81.8766409&carousel=true&third_party_vendor=1"
    );

    const json = await data.json();

    console.log(json);

    const restaurantData = json?.data?.cards?.find(
      (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    selistofrestaurant(restaurantData || []);
    setFilteredrestaurant(restaurantData || []);

    const offset = json?.data?.pageOffset?.nextOffset;
    setNextOffset(offset || null);
  };

  const fetchMoreRestaurants = async () => {
    try {
      if (!nextOffset) return; // No more data

      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lat: 25.4077022,
            lng: 81.8766409,
            nextOffset: nextOffset,
            page_type: "DESKTOP_WEB_LISTING",
          }),
        }
      );
     

      const json = await data.json();
      console.log("Load more:", json);

      const newRestaurants = json?.data?.cards?.find(
        (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      // Update nextOffset
      const newOffset = json?.data?.pageOffset?.nextOffset;
      setNextOffset(newOffset || null);

      if (newRestaurants?.length) {
        selistofrestaurant((prev) => [...prev, ...newRestaurants]);
        setFilteredrestaurant((prev) => [...prev, ...newRestaurants]);
      }
    } catch (err) {
      console.error("Error fetching updates:", err);
    }
  };
   useEffect(() => {
        const handleScroll = () => {
          if (
            !isFetching &&
            nextOffset &&
            window.innerHeight + window.scrollY >=
              document.body.offsetHeight - 200
          ) {
            setIsFetching(true);
            fetchMoreRestaurants().finally(() => setIsFetching(false));
          }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [isFetching, nextOffset]);
  //conditional rendering
  // if(listofrestaurant.length===0){
  //   return <Shimmer/>
  // }
  return listofrestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              const filteredlist = listofrestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredrestaurant(filteredlist);
            }}
            className="search-btn"
          >
            Search
          </button>
        </div>

        <button
          className="filter-btn"
          onClick={() => {
            const filteredlist = listofrestaurant.filter(
              (res) => res.info.avgRating > 4.2
            );
            setFilteredrestaurant(filteredlist);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredrestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resdata={restaurant} />
        ))}
      </div>
    </div>
  );
};
export default Body;

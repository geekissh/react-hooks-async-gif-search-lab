import React, { useState, useEffect } from "react";
import GifList from "./GifList";
import GifSearch from "./GifSearch";

function GifListContainer() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=YOUR_API_KEY&rating=g`
        );
        const data = await response.json();
        setGifs(data.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching gifs: ", error);
      }
    };

    fetchGifs();
  }, [query]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <GifSearch onSearch={handleSearch} />
      <GifList gifs={gifs} />
    </div>
  );
}

export default GifListContainer;

import React, { useState } from "react";
import FilterSection from "./FilterSection";
import CardGrid from "./CardGrid";

function Body() {
  const [selectedArea, setSelectedArea] = useState("Indian");
  const [sortOrder, setSortOrder] = useState("asc");
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="md:container mx-auto min-h-screen">
      <FilterSection setSelectedArea={setSelectedArea} toggleSortOrder={toggleSortOrder} />
      <CardGrid selectedArea={selectedArea} sortOrder={sortOrder} />
    </div>
  );
}

export default Body;

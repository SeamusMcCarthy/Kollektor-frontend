
import React from "react";
import { withRouter } from "react-router-dom";
import EntriesList from "../components/EntriesList";
import './CategoryPage.css'
import FilterCard from "../components/FilterCard";

const CategoryPage = () => {
  const ENTRIES = [
    {
      id: "e1",
      name: "Schecter JLV6",
      description: "Pointy as hell!!",
      image:
        "/images/Guitar.jfif",
      entries: 1,
    },
    {
        id: "e2",
        name: "Fender Telecaster Baja",
        description: "For more mellow stuff",
        image:
          "/images/Bass.jfif",
        entries: 2,
      },
      {
        id: "e3",
        name: "Schecter Demon 7",
        description: "For lower range material",
        image:
          "/images/Pedal.jfif",
        entries: 6,
      },
  ];

  return <div className="grid-container">
    <div className="grid-child">
      <FilterCard />
    </div>
    <div className="grid-child">
    <EntriesList items={ENTRIES} />;
    </div>
  </div>
  
  
};

export default withRouter(CategoryPage)
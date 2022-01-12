
import React from "react";
import { withRouter } from "react-router-dom";
import CategoriesList from "../components/CategoriesList";

const LandingPage = () => {
  const CATEGORIES = [
    {
      id: "c1",
      name: "Guitar",
      description: "Search through our extensive collection of guitars - acoustic, electric, extended range. They're all here!",
      image:
        "/images/Guitar.jfif",
      entries: 1,
    },
    {
        id: "c2",
        name: "Bass",
        description: "Keep it on the down low in our Bass section!",
        image:
          "/images/Bass.jfif",
        entries: 2,
      },
      {
        id: "c3",
        name: "FX",
        description: "The go-to section for FX afficionados!",
        image:
          "/images/Pedal.jfif",
        entries: 6,
      },
  ];

  return <CategoriesList items={CATEGORIES} />;
};

export default withRouter(LandingPage)
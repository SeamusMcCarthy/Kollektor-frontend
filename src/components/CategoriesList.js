import React from "react";
import Card from "@mui/material/Card";

import CategoryItem from "./CategoryItem";
import "./List.css";

const CategoriesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div class-name="center">
        <Card>
          <h2>No categories found!</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="common-list">
      {props.items.map((cat) => (
        <CategoryItem
          key={cat.id}
          id={cat.id}
          image={cat.image}
          name={cat.title}
          entryCount={cat.entries.length}
          description={cat.description}
        />
      ))}
    </ul>
  );
};

export default CategoriesList;

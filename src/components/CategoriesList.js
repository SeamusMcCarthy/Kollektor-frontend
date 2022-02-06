import React from "react";
import CategoryItem from "./CategoryItem";
import Card from "./Card";
import "./CategoriesList.css";

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
    <ul className="users-list">
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

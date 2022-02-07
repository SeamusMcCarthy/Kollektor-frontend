import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../shared/components/UIElements/Avatar";
import Card from "../shared/components/UIElements/Card";
import "./Item.css";

const CategoryItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/category/${props.id}`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.entryCount} {props.entryCount === 1 ? "Entry" : "Entries"}
            </h3>
            <p>{props.description}</p>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default CategoryItem;

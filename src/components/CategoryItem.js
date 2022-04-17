import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";

import "./Item.css";

const CategoryItem = (props) => {
  return (
    <li className="cat-item">
      <Card className="cat-item__content">
        <Link to={`/category/${props.id}`}>
          <div className="cat-item__image">
            <Avatar
              src={props.image}
              alt={props.name}
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <div className="cat-item__info">
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

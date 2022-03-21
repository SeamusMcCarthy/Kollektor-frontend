import React from "react";
import { Link } from "react-router-dom";
// import Avatar from "../shared/components/UIElements/Avatar";
// import Card from "../shared/components/UIElements/Card";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import "./Item.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/user/${props.id}`}>
          <div className="user-item__image">
            <Avatar
              src={props.image}
              alt={props.name}
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.entryCount} {props.entryCount === 1 ? "Entry" : "Entries"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;

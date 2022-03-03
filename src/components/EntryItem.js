import React from "react";
import { Link } from "react-router-dom";
// import Avatar from "../shared/components/UIElements/Avatar";
// import Card from "../shared/components/UIElements/Card";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import "./Item.css";

const EntryItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/entry/${props.id}`}>
          <div className="user-item__image">
            <Avatar
              src={`http://localhost:5000/${props.image}`}
              alt={props.name}
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.title}</h2>
            {/* <h3>{props.entryCount} {props.entryCount === 1 ? 'Entry' : 'Entries'}</h3> */}
            <p>{props.description}</p>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default EntryItem;

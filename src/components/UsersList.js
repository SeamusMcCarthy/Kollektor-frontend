import React from "react";
import UserItem from "./UserItem";
// import Card from "../shared/components/UIElements/Card";
import Card from "@mui/material/Card";
import "./List.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div class-name="center">
        <Card>
          <h2>No users found!</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="common-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          entryCount={user.entries.length}
          location={user.location}
        />
      ))}
    </ul>
  );
};

export default UsersList;

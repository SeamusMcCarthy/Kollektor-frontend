import React from "react";
import EntryItem from "./EntryItem";
import Card from "./Card";
import "./EntriesList.css";

const EntriesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div class-name="center">
        <Card>
          <h2>No entries found!</h2>
        </Card>
      </div>
    );
  }

  return (
      <ul className="entries-list">
        {props.items.map((entry) => (
          <EntryItem
            key={entry.id}
            id={entry.id}
            image={entry.image}
            name={entry.name}
            entryCount={entry.entries}
            description={entry.description}
          />
        ))}
      </ul>
  );
};

export default EntriesList;

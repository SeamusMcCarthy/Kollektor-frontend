import React from "react";
import EntryItem from "./EntryItem";
// import Card from "../shared/components/UIElements/Card";
import Card from "@mui/material/Card";
import "./EntriesList.css";
import Grid from "@mui/material/Grid";

const EntriesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No entries found!</h2>
        </Card>
      </div>
    );
  }

  let cards = props.items.map((entry) => (
    <Grid key={entry.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
      <EntryItem
        key={entry.id}
        id={entry.id}
        image={entry.image}
        title={entry.title}
        entryCount={entry.entries}
        description={entry.description}
        creatorImage={entry.creator.image}
        creatorName={entry.creator.name}
      />
    </Grid>
  ));
  return cards;
};

export default EntriesList;

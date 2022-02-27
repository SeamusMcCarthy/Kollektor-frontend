import React, { useState } from "react";
import EntriesList from "./EntriesList";
import Card from "../shared/components/UIElements/Card";
import "./Search.css";
import Grid from "@mui/material/Grid";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEntries = props.items.filter((entry) => {
    return (
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Grid container>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Card className="search">
            <h2>Search</h2>
            <input
              //   className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
              type="search"
              placeholder="Search entries..."
              onChange={handleChange}
            />
            <img
              src="/images/site/Header_cropped2.jpg"
              width="100%"
              // height="150"
              alt=""
            />
          </Card>
        </Grid>
        <Grid key="find" item xs={12} sm={6} md={8} lg={8} xl={8}>
          <EntriesList items={filteredEntries} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Search;

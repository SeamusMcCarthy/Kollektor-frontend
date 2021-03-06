import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

import EntriesList from "./EntriesList";
import "./Search.css";

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
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={3}>
          <Card className="search">
            <CardContent>
              <h2>Search</h2>
              <input
                type="search"
                placeholder="Search entries..."
                onChange={handleChange}
              />
              <img
                src="/images/site/Header_cropped2.jpg"
                width="100%"
                alt="Search"
              />
            </CardContent>
          </Card>
        </Grid>
        <EntriesList items={filteredEntries} />
      </Grid>
    </Grid>
  );
};

export default Search;

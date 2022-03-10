import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import EntriesList from "./EntriesList";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Search.css";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
const Img = styled("img")({});

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
              <Img
                src="/images/site/Header_cropped2.jpg"
                width="100%"
                alt="Search image"
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

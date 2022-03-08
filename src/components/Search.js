import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import EntriesList from "./EntriesList";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Search.css";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
const Img = styled("img")({});
const Input = styled("input")({});

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
              <Input
                //   className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                // sx={{ margin: 2 }}
                type="search"
                placeholder="Search entries..."
                onChange={handleChange}
              />
              <Img
                // sx={{ margin: 2 }}
                src="/images/site/Header_cropped2.jpg"
                width="100%"
                // height="150"
                alt=""
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

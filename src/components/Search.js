import React, { useState } from "react";
// import Scroll from "./Scroll";
import EntriesList from "./EntriesList";
import Card from "../shared/components/UIElements/Card";
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
    <>
      <div className="left">
        <Card className="search">
          <h2>Search</h2>
          <input
            //   className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
            type="search"
            placeholder="Search entries..."
            onChange={handleChange}
          />
        </Card>
      </div>
      <div className="left">
        {/* <Scroll> */}
        <EntriesList items={filteredEntries} />
        {/* </Scroll> */}
      </div>
    </>
  );
};

export default Search;

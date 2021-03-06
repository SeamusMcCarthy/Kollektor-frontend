import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { withRouter } from "react-router-dom";
import Grid from "@mui/material/Grid";

import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import useHttpClient from "../shared/hooks/http-hook";

import Search from "../components/Search";
import Header from "../components/Header";
import "./Entries.css";

const CategoryEntries = (props) => {
  document.title = "Category Entries";
  const catId = useParams().catId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEntries, setLoadedEntries] = useState();

  useEffect(() => {
    async function fetchEntries() {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/entry/cat/${catId}`
        );
        setLoadedEntries(responseData.entries);
      } catch (e) {
        console.log(e.message);
      }
    }
    fetchEntries();
  }, [sendRequest, catId]);
  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title="Category Entries" />
      </Grid>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {/* {!isLoading && loadedEntries && <EntriesList items={loadedEntries} />} */}
      {!isLoading && loadedEntries && <Search items={loadedEntries} />}
    </Grid>
  );
};

export default withRouter(CategoryEntries);

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import useHttpClient from "../shared/hooks/http-hook";

import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import CategoriesList from "../components/CategoriesList";

import Grid from "@mui/material/Grid";
import Header from "../components/Header";

const Categories = () => {
  document.title = "Categories";
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCategories, setLoadedCategories] = useState();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/cat`
        );
        setLoadedCategories(responseData.categories);
      } catch (e) {
        console.log(e.message);
      }
    }
    fetchCategories();
  }, [sendRequest]);

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title="Categories" />
      </Grid>
      <ErrorModal error={error} asOverlay onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCategories && (
        <CategoriesList items={loadedCategories} />
      )}
    </Grid>
  );
};

export default withRouter(Categories);

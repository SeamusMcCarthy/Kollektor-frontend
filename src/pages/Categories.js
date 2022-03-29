import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import useHttpClient from "../shared/hooks/http-hook";

import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import CategoriesList from "../components/CategoriesList";

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
    <>
      <ErrorModal error={error} asOverlay onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCategories && (
        <CategoriesList items={loadedCategories} />
      )}
    </>
  );
};

export default withRouter(Categories);

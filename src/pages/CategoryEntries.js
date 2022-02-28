import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { withRouter } from "react-router-dom";
// import EntriesList from "../components/EntriesList";
import "./Entries.css";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import useHttpClient from "../shared/hooks/http-hook";
import Search from "../components/Search";

const CategoryEntries = (props) => {
  document.title = "Category Entries";
  const catId = useParams().catId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEntries, setLoadedEntries] = useState();

  useEffect(() => {
    async function fetchEntries() {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/v1/entry/cat/${catId}`
        );
        setLoadedEntries(responseData.entries);
      } catch (e) {
        console.log(e.message);
      }
    }
    fetchEntries();
  }, [sendRequest, catId]);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {/* {!isLoading && loadedEntries && <EntriesList items={loadedEntries} />} */}
      {!isLoading && loadedEntries && <Search items={loadedEntries} />}
    </>
  );
};

export default withRouter(CategoryEntries);

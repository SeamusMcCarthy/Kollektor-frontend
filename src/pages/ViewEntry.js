import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";

import useHttpClient from "../shared/hooks/http-hook";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import EntryItemDetail from "../components/EntryItemDetail";
import Comments from "../components/Comments";
import AuthContext from "../shared/contexts/auth-context";

const ViewEntry = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const entryId = useParams().eid;
  const [loadedEntry, setLoadedEntry] = useState();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/v1/entry/${entryId}`
        );
        setLoadedEntry(responseData.entry);
      } catch (e) {}
    };
    fetchEntry();
  }, [sendRequest, entryId]);

  function entryDeleteHandler(deletedEntryId) {
    // Direct back to homepage
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedEntry && (
        <>
          <EntryItemDetail
            key={loadedEntry.id}
            id={loadedEntry.id}
            image={loadedEntry.image}
            name={loadedEntry.name}
            title={loadedEntry.title}
            description={loadedEntry.description}
            address={loadedEntry.address}
            creatorId={loadedEntry.creator}
            coordinates={loadedEntry.location}
            onDelete={entryDeleteHandler}
          />
          <Comments
            currentUserId={auth.userId}
            comments={loadedEntry.comments}
            entryId={entryId}
          />
        </>
      )}
    </>
  );
};

export default ViewEntry;

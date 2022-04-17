import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import AuthContext from "../shared/contexts/auth-context";
import useHttpClient from "../shared/hooks/http-hook";

import EntryItemDetail from "../components/EntryItemDetail";
import Comments from "../components/Comments";
import Header from "../components/Header";

const ViewEntry = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const entryId = useParams().eid;
  const [loadedEntry, setLoadedEntry] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/entry/${entryId}`
        );
        setLoadedEntry(responseData.entry);
      } catch (e) {}
    };
    fetchEntry();
  }, [sendRequest, entryId]);

  function entryDeleteHandler() {
    history.push("/");
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
        <Grid container sx={{ padding: "20px" }}>
          <Grid item xs={12}>
            <Header title="View Entry" />
          </Grid>
          <ErrorModal error={error} onClear={clearError} />
          <Card
            sx={{
              width: 9 / 10,
              maxWidth: 1000,
              m: 3,
              mx: "auto",
              textAlign: "center",
              padding: 1.6,
              boxShadow: 2,
              borderRadius: 6,
            }}
          >
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
          </Card>
        </Grid>
      )}
    </>
  );
};

export default ViewEntry;

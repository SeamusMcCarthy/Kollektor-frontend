import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import useHttpClient from "../shared/hooks/http-hook";

import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import UsersList from "../components/UsersList";

import Grid from "@mui/material/Grid";
import Header from "../components/Header";

const Users = () => {
  document.title = "Users";
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/v1/user"
        );
        setLoadedUsers(responseData.users);
      } catch (e) {
        console.log(e.message);
      }
    }
    fetchUsers();
  }, [sendRequest]);

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title="Users" />
      </Grid>
      <ErrorModal error={error} asOverlay onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </Grid>
  );
};

export default withRouter(Users);

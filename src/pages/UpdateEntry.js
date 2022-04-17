import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import AuthContext from "../shared/contexts/auth-context";
import { useForm } from "../shared/hooks/form-hook";
import useHttpClient from "../shared/hooks/http-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../shared/util/validators";

import Header from "../components/Header";
import "./EntryForm.css";

function UpdateEntry(props) {
  document.title = "Update Entry";
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const entryId = useParams().eid;
  const [identifiedEntry, setIdentifiedEntry] = useState();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/api/v1/entry/${entryId}`
        );
        setIdentifiedEntry(responseData.entry);
        setFormData(
          {
            title: {
              value: responseData.entry.title,
              isValid: true,
            },
            description: {
              value: responseData.entry.description,
              isValid: true,
            },
          },
          true
        );
      } catch (e) {}
    };
    fetchEntry();
  }, [sendRequest, entryId, setFormData]);

  async function entryUpdateSubmitHandler(e) {
    e.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/api/v1/entry/${entryId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/user/" + auth.userId);
    } catch (e) {}
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!identifiedEntry && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find entry</h2>
        </Card>
      </div>
    );
  }

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title="Update Entry" />
      </Grid>
      <ErrorModal error={error} onClear={clearError} />
      <Card
        sx={{
          width: 9 / 10,
          maxWidth: 400,
          m: 11.2,
          mx: "auto",
          textAlign: "center",
          padding: 1.6,
          boxShadow: 2,
          borderRadius: 6,
        }}
      >
        {!isLoading && identifiedEntry && (
          <>
            <h2>Update Entry</h2>
            <hr />
            <form onSubmit={entryUpdateSubmitHandler}>
              <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValue={identifiedEntry.title}
                initialValid={true}
              ></Input>
              <Input
                id="description"
                element="textarea"
                type="text"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min 5 characters)."
                onInput={inputHandler}
                initialValue={identifiedEntry.description}
                initialValid={true}
              ></Input>
              <Button type="submit" disabled={!formState.isValid}>
                UPDATE
              </Button>
            </form>
          </>
        )}
      </Card>
    </Grid>
  );
}

export default UpdateEntry;

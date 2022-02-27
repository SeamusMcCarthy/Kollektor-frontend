import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import Card from "../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../shared/util/validators";
import "./EntryForm.css";
import { useForm } from "../shared/hooks/form-hook";
import useHttpClient from "../shared/hooks/http-hook";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import AuthContext from "../shared/contexts/auth-context";

function UpdateEntry(props) {
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
          `http://localhost:5000/api/v1/entry/${entryId}`
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
        `http://localhost:5000/api/v1/entry/${entryId}`,
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
      history.push("/" + auth.userId + "/entries/");
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
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && identifiedEntry && (
        <form className="place-form" onSubmit={entryUpdateSubmitHandler}>
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
      )}
    </>
  );
}

export default UpdateEntry;

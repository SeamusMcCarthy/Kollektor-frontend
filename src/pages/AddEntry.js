import React, { useContext, useState, useEffect } from "react";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import "./EntryForm.css";
import { useForm } from "../shared/hooks/form-hook";
import Card from "@mui/material/Card";
import useHttpClient from "../shared/hooks/http-hook";
import AuthContext from "../shared/contexts/auth-context";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";
import ImageUpload from "../shared/components/FormElements/ImageUpload";
import Grid from "@mui/material/Grid";
import Header from "../components/Header";

const AddEntry = () => {
  document.title = "New Entry";
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
      category: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/v1/cat"
        );
        setLoadedCategories(responseData.categories);
      } catch (e) {
        console.log(e.message);
      }
    }
    fetchCategories();
  }, [sendRequest]);

  const history = useHistory();
  async function entrySubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("creator", auth.userId);
    formData.append("image", formState.inputs.image.value);

    formData.append("category", formState.inputs.category.value);
    try {
      await sendRequest(
        "http://localhost:5000/api/v1/entry",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (e) {}
  }

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title="Add Entry" />
      </Grid>
      <ErrorModal error={error} onClear={clearError} />
      <Card
        sx={{
          width: 9 / 10,
          maxWidth: 800,
          m: 3,
          mx: "auto",
          textAlign: "center",
          padding: 1.6,
          boxShadow: 2,
          borderRadius: 6,
        }}
      >
        <h2>Add a new entry</h2>
        <hr />
        <form onSubmit={entrySubmitHandler}>
          {isLoading || (!loadedCategories && <LoadingSpinner asOverlay />)}
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            errorText="Please enter a valid value"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            errorText="Please enter a valid description (at least 5 characters)"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
          />
          <Input
            id="address"
            element="input"
            type="text"
            label="Address"
            errorText="Please enter a valid address"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <ImageUpload
            id="image"
            center
            onInput={inputHandler}
            errorText="Please provide an image."
          />

          <Input
            id="category"
            element="select"
            onInput={inputHandler}
            label="Category"
            validators={[VALIDATOR_REQUIRE()]}
            list={loadedCategories}
          />

          <Button type="submit" disabled={!formState.isValid}>
            ADD ENTRY
          </Button>
        </form>
      </Card>
    </Grid>
  );
};

export default AddEntry;

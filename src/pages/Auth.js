import React, { useState, useContext } from "react";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../shared/hooks/form-hook";
// import Card from "../shared/components/UIElements/Card";
import Card from "@mui/material/Card";
import "./Auth.css";
import AuthContext from "../shared/contexts/auth-context";
import useHttpClient from "../shared/hooks/http-hook";
import ImageUpload from "../shared/components/FormElements/ImageUpload";

function Auth() {
  document.title = "Sign Up / Sign In";
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  async function authSubmitHandler(e) {
    e.preventDefault();
    console.log(formState.inputs);
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/v1/user/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (e) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("address", formState.inputs.address.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/v1/user/signup",
          "POST",
          formData
        );
        auth.login(responseData.userId, responseData.token);
      } catch (e) {}
    }
  }

  function switchModeHandler() {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
          address: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          image: { value: null, isValid: false },
          address: { value: "", isValid: false },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card
        className="authentication"
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
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name"
              onInput={inputHandler}
              initialValue=""
              initialValid={false}
            ></Input>
          )}
          {!isLoginMode && (
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
            initialValue=""
            initialValid={false}
          ></Input>
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password (min 6 characters)."
            onInput={inputHandler}
            initialValue=""
            initialValid={false}
          ></Input>
          {!isLoginMode && (
            <Input
              element="input"
              id="address"
              type="text"
              label="Address"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your address"
              onInput={inputHandler}
              initialValue=""
              initialValid={false}
            ></Input>
          )}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOG IN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGN UP" : "LOG IN"}
        </Button>
      </Card>
    </>
  );
}

export default Auth;

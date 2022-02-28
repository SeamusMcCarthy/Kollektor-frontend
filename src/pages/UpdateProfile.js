import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
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
import Card from "../shared/components/UIElements/Card";
import "./Auth.css";
import AuthContext from "../shared/contexts/auth-context";
import useHttpClient from "../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
// import ImageUpload from "../shared/components/FormElements/ImageUpload";

function UpdateProfile() {
  document.title = "Update Profile";
  const auth = useContext(AuthContext);
  const [identifiedUser, setIdentifiedUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().uid;
  const history = useHistory();

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
      name: { value: "", isValid: false },
      image: { value: null, isValid: false },
      address: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/v1/user/${userId}`
        );
        setIdentifiedUser(responseData.user);
        setFormData(
          {
            email: {
              value: responseData.user.email,
              isValid: true,
            },
            password: {
              value: "",
              isValid: false,
            },
            name: {
              value: responseData.user.name,
              isValid: true,
            },
            address: {
              value: responseData.user.address,
              isValid: true,
            },
          },
          false
        );
      } catch (e) {}
    };
    fetchUser();
  }, [sendRequest, userId, setFormData]);

  async function userUpdateSubmitHandler(e) {
    e.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/v1/user/${userId}`,
        "PATCH",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          name: formState.inputs.name.value,
          address: formState.inputs.address.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      // history.push("/" + auth.userId + "/entries/");
      history.push("/");
    } catch (e) {}
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!identifiedUser && !error) {
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
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Edit Profile</h2>
        <hr />
        <form onSubmit={userUpdateSubmitHandler}>
          <Input
            element="input"
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name"
            onInput={inputHandler}
            initialValue={identifiedUser.name}
            initialValid={true}
          ></Input>
          {/* <ImageUpload
            id="image"
            center
            onInput={inputHandler}
            errorText="Please provide an image."
          /> */}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
            initialValue={identifiedUser.email}
            initialValid={true}
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
          <Input
            element="input"
            id="address"
            type="text"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your address"
            onInput={inputHandler}
            initialValue={identifiedUser.address}
            initialValid={true}
          ></Input>
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE
          </Button>
        </form>
      </Card>
    </>
  );
}

export default UpdateProfile;

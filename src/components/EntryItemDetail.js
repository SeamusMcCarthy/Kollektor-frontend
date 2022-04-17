import React, { useState, useContext } from "react";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Button from "../shared/components/FormElements/Button";
import Modal from "../shared/components/UIElements/Modal";
import Map from "../shared/components/UIElements/Map";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import AuthContext from "../shared/contexts/auth-context";
import useHttpClient from "../shared/hooks/http-hook";
import Share from "./Share";
import "./EntryItemDetail.css";

const EntryItemDetail = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/entry/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (e) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="entry-item__modal-content"
        footerClass="entry-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="entry-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this entry? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>

      {/* <Card variant="outlined" sx={{mb: 2}}> */}
      {isLoading && <LoadingSpinner asOverlay />}
      <CardMedia
        component="img"
        sx={{ height: 600, mb: 2, width: "100%" }}
        image={props.image}
        alt={props.title}
      />
      <CardContent sx={{ mb: 2, justifyItems: "left" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Title: {props.title}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Purchased at: {props.address}
        </Typography>
        <Typography variant="string" component="p" sx={{ mb: 2 }}>
          Description: {props.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button inverse onClick={openMapHandler}>
          VIEW ON MAP
        </Button>
        {auth.userId === props.creatorId && (
          <Button to={`/entries/${props.id}`}>EDIT</Button>
        )}
        {auth.userId === props.creatorId && (
          <Button danger onClick={showDeleteWarningHandler}>
            DELETE
          </Button>
        )}
      </CardActions>
      <CardActions sx={{ justifyContent: "center" }}>
        <Share />
      </CardActions>
      {/* </Card> */}
    </>
  );
};

export default EntryItemDetail;

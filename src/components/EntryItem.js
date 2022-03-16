import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// import "./Item.css";

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const EntryItem = (props) => {
  const url = window.location.host + `/entry/${props.id}`;
  const dateAdded = new Date(props.dateAdded).toLocaleDateString();
  return (
    <Card sx={{ maxWidth: 450, marginTop: 2.5 }}>
      <Link to={`/entry/${props.id}`} style={{ textDecoration: "none" }}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="userAvatar"
              src={`http://localhost:5000/${props.creatorImage}`}
              alt={props.creatorName}
            />
          }
          title={props.title}
          subheader={`Added: ${dateAdded}`}
        />
        <CardMedia
          component="img"
          sx={{ height: 200 }}
          image={`http://localhost:5000/${props.image}`}
          alt={props.title}
        />
        <CardContent>
          <Typography
            variant="string"
            component="p"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <FacebookShareButton url={url}>
            <FacebookIcon size={30} style={{ borderRadius: 25 }}></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={30} style={{ borderRadius: 25 }}></TwitterIcon>
          </TwitterShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={30} style={{ borderRadius: 25 }}></WhatsappIcon>
          </WhatsappShareButton>
          <RedditShareButton url={url}>
            <RedditIcon size={30} style={{ borderRadius: 25 }}></RedditIcon>
          </RedditShareButton>
          <EmailShareButton url={url}>
            <EmailIcon size={30} style={{ borderRadius: 25 }}></EmailIcon>
          </EmailShareButton>
        </CardActions>
      </Link>
    </Card>
  );
};

export default EntryItem;

import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const EntryItem = (props) => {
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
      </Link>
    </Card>
  );
};

export default EntryItem;

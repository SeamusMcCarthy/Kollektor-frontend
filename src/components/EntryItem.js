import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "./Item.css";

const EntryItem = (props) => {
  return (
    <Card sx={{ maxWidth: 450, marginTop: 2.5 }}>
      <Link to={`/entry/${props.id}`} style={{ textDecoration: "none" }}>
        <CardHeader
          // className={classes.header}
          // avatar={
          //   <Avatar
          //     sx={{ backgroundColor: "rgb(255, 0, 0)" }}
          //     src={`http://localhost:5000/${props.creatorImage}`}
          //     alt={props.creatorName}
          //   />
          // }
          title={
            <Typography variant="h5" component="p">
              {props.title}{" "}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          sx={{ height: 500 }}
          image={`http://localhost:5000/${props.image}`}
          alt={props.title}
        />
        <CardContent>
          <Grid container>
            <Grid container xs={12}>
              {/* <Typography variant="h6" component="p">
                {props.description}
              </Typography> */}
              <Grid item xs={2}>
                <Avatar
                  sx={{ backgroundColor: "rgb(255, 0, 0)" }}
                  src={`http://localhost:5000/${props.creatorImage}`}
                  alt={props.creatorName}
                />
              </Grid>

              <Grid item xs={10}>
                <Typography variant="body1" component="p">
                  Added by : {props.creatorName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Link>
    </Card>
  );
};

export default EntryItem;

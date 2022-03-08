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
      <Link to={`/entry/${props.id}`}>
        <CardHeader
          // className={classes.header}
          avatar={
            <Avatar
              sx={{ backgroundColor: "rgb(255, 0, 0)" }}
              src={`http://localhost:5000/${props.creatorImage}`}
              alt={props.name}
            />
          }
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
        />
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6" component="p">
                {/* <CalendarIcon fontSize="small" /> */}
                {props.description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        {/* <CardActions>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
        <Link to={`/movies/${movie.id}/cast`}>
          <Button variant="outlined" size="medium" color="primary">
            Cast
          </Button>
        </Link>
      </CardActions> */}
      </Link>
    </Card>
  );
};

export default EntryItem;

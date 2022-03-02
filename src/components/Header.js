import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { makeStyles } from "@mui/core/styles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { withRouter } from "react-router-dom";
// import { createTheme } from "@mui/system";

// const theme = createTheme({
//   root: {
// display: "flex",
// justifyContent: "space-around",
// flexWrap: "wrap",
// marginBottom: theme.spacing(1.5),
//   },
// });

const Header = ({ title, history }) => {
  //   const classes = useStyles();
  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        // marginBottom: theme.spacing(1.5),
      }}
    >
      <IconButton aria-label="go back" onClick={() => history.goBack()}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <IconButton aria-label="go forward" onClick={() => history.goForward()}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default withRouter(Header);

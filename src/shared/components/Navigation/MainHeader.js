import React from "react";
import { styled } from "@mui/material/styles";
import "./MainHeader.css";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const MainHeader = (props) => {
  return (
    <>
      <header className="main-header">{props.children}</header>
      <Offset />
    </>
  );
};

export default MainHeader;

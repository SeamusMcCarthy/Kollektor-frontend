import React from "react";
import "./MainHeader.css";
import { styled } from "@mui/material/styles";
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

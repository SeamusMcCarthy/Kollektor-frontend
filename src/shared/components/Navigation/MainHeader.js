import React from "react";
import "./MainHeader.css";

const MainHeader = (props) => {
  return (
    <>
      <header className="main-header">{props.children}</header>
      <div className="main-image">
        <img src="/images/site/Header_cropped.jpg" alt="" />
      </div>
    </>
  );
};

export default MainHeader;

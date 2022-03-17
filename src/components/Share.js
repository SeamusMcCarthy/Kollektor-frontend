import React from "react";
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

const Share = () => {
  const url = window.location.href;
  return (
    <>
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
    </>
  );
};

export default Share;

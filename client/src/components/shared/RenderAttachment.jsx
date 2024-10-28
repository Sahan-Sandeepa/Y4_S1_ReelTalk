// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from 'react-router-dom';
import { transformImage } from "../../libs/Features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

// eslint-disable-next-line no-unused-vars
const RenderAttachment = (file, url, link, isApproved, age) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/movie-detail?param=${link}`);
  }

  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="Attachement"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "contain",
          }}
          onClick={handleClick}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return <FileOpenIcon />;
  }
};

export default RenderAttachment;
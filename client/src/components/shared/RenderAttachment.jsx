// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from 'react-router-dom';
import { transformImage } from "../../libs/Features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const RenderAttachment = (file, url) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/movie-detail', { state: { url } });
  };

  switch (file) {
    case "video":
      return (
        <video
          src={url}
          preload="none"
          width="200px"
          controls
          style={{
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      );

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="Attachment"
          width="150px"
          height="200px"
          style={{
            objectFit: "fill",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={handleClick}
        />
      );

    case "audio":
      return (
        <audio
          src={url}
          preload="none"
          controls
          style={{ borderRadius: "8px" }}
        />
      );

    default:
      return <FileOpenIcon />;
  }
};

export default RenderAttachment;
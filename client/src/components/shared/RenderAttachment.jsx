// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from 'react-router-dom';
import { transformImage } from "../../libs/Features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const RenderAttachment = (file, url, isApproved, userAge) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (userAge < 18 && isApproved === false) {
      e.preventDefault();
    } else {
      navigate('/movie-detail', { state: { url } });
    }
  };

  const commonStyles = {
    borderRadius: "8px",
    cursor: "pointer",
  };

  switch (file) {
    case "video":
      return (
        <video
          src={url}
          preload="none"
          width="200px"
          controls
          style={commonStyles}
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
            ...commonStyles,
            filter: userAge < 18 && !isApproved ? "blur(5px)" : "none",
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
          style={commonStyles}
        />
      );

    default:
      return <FileOpenIcon />;
  }
};

export default RenderAttachment;
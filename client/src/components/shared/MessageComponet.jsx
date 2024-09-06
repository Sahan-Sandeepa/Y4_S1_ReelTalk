import { Box, Typography, Avatar, IconButton, Button } from "@mui/material";
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import { memo } from "react";
import PropTypes from 'prop-types';
import { lightBlue } from "../../constants/Color";
import moment from "moment";
import { fileFormat } from "../../libs/Features"; 
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  const avatarUrl = user.avatar?.url;
  const firstLetter = user.name[0]?.toUpperCase();

  const handleApprove = (attachment) => {
    console.log("Approved", attachment);
    // Add further logic here
  };

  const handleReject = (attachment) => {
    console.log("Rejected", attachment);
    // Add further logic here
  };


  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '1rem',
      }}
    >
      {!sameSender && (
        <Box display="flex" alignItems="center" marginBottom="0.5rem">
          <Avatar
            src={avatarUrl}
            alt={sender.name}
            sx={{
              bgcolor: avatarUrl ? 'transparent' : lightBlue,
              width: 32,
              height: 32,
              border: '2px solid #ccc',
              marginRight: '0.5rem',
              fontSize: '0.5rem',
            }}
          >
            {!avatarUrl && firstLetter}
          </Avatar>
          <Typography color={lightBlue} fontWeight={"600"} variant="body2">
            {sender.name}
          </Typography>
        </Box>
      )}

      <Box>
        {content && (
          <Typography variant="body1" style={{ marginBottom: "0.1rem" }}>
            {content}
          </Typography>
        )}

        {attachments.length > 0 &&
          attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);

            return (
              <Box key={index}>
                <a
                  href={url}
                  target="_blank"
                  download
                  style={{
                    color: "black",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  {RenderAttachment(file, url)}
                </a>
                
                {(file === "image" || file === "video") && (
                  <Box display="flex" flexDirection="column" marginTop="0.5rem" sx={{ width: "100%" }}>
                    {/* Approve Section */}
                    <Button
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid green",
                        borderRadius: "1rem",
                        padding: "0.5rem",
                        maxWidth: "9.5rem",
                        maxHeight: "2rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "#55cc00" }}>
                        Approve
                      </Typography>
                      <IconButton color="success" onClick={() => handleApprove('Hi')}>
                        <CheckCircleTwoToneIcon sx={{ color: "#55cc00" }} />
                      </IconButton>
                    </Button>

                    {/* Reject Section */}
                    <Button
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid red",
                        borderRadius: "1rem",
                        maxWidth: "9.5rem",
                        maxHeight: "2rem",
                        padding: "0.5rem",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "red" }}>
                        Reject
                      </Typography>
                      <IconButton color="error" onClick={() => handleReject('Bye')}>
                        <ThumbDownAltTwoToneIcon sx={{ color: "red" }} />
                      </IconButton>
                    </Button>
                  </Box>
                )}
              </Box>
            );
          })}

        {/* Time and DoneAll Icon */}
        <Box display="flex" alignItems="center" marginTop="0.1rem">
          <Typography variant="caption" color={"text.secondary"}>
            {timeAgo}
          </Typography>
          <DoneAllTwoToneIcon fontSize="small" sx={{ color: "gray", marginLeft: "3.5rem" }} />
        </Box>
      </Box>
    </motion.div>
  );
};

MessageComponent.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }).isRequired,
    content: PropTypes.string,
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
    name: PropTypes.string,
  }).isRequired,
};

export default memo(MessageComponent);

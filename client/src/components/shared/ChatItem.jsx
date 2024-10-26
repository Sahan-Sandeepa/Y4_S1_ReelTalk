// eslint-disable-next-line no-unused-vars
import React, { memo } from "react";
import PropTypes from 'prop-types';
import { Link } from "../styles/StyledComponent";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
  onChatSelect,
  selectedAction,
  poster
}) => {
  return (
    <Link
      style={{
        padding: "0",
        textDecoration: 'none',
      }}
      to={`/chat/${_id}?param=${selectedAction}&secondParam=${poster}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      onClick={() => onChatSelect(_id)}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 * index }}
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          backgroundColor: sameSender ? "rgba(0, 0, 0, 0.2)" : (isOnline ? "rgba(0, 0, 0, 0.1)" : "white"),
          color: sameSender ? "white" : "black",
          position: "relative",
          padding: "0.75rem",
          borderRadius: "0.75rem",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "0.75rem",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        <AvatarCard avatar={avatar} />

        <Stack sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: sameSender ? "white" : "black" }}>
            {name}
          </Typography>
          {/* Uncomment if you have last message preview */}
          {/* <Typography variant="body2" sx={{color: sameSender ? "white" : "black"}}>
            Last message preview...
          </Typography> */}
          {newMessageAlert && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                fontWeight: 'bold',
                fontSize: '0.9rem',
                display: 'inline',
                marginRight: '4px',
              }}
            >
              {newMessageAlert.count} new messages
            </Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

ChatItem.propTypes = {
  avatar: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  onChatSelect: PropTypes.string.isRequired,
  groupChat: PropTypes.bool,
  sameSender: PropTypes.bool,
  selectedAction: PropTypes.string,
  poster: PropTypes.string,
  isOnline: PropTypes.bool,
  newMessageAlert: PropTypes.shape({
    count: PropTypes.number
  }),
  index: PropTypes.number,
  handleDeleteChat: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default memo(ChatItem);

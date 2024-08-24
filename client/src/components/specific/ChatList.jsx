import { Stack } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [],
  handleDeleteChat,
}) => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleClick = (id) => {
    setSelectedChatId(id);
  };

  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"} p={2}>
      {chats.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;

        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );

        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
            handleClick={handleClick}
            isSelected={selectedChatId === _id}
          />
        );
      })}
    </Stack>
  );
};

ChatList.propTypes = {
  w: PropTypes.string,
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.array,
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      groupChat: PropTypes.bool.isRequired,
      members: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  chatId: PropTypes.string.isRequired,
  onlineUsers: PropTypes.arrayOf(PropTypes.string),
  newMessagesAlert: PropTypes.arrayOf(
    PropTypes.shape({
      chatId: PropTypes.string,
      count: PropTypes.number,
    })
  ),
  handleDeleteChat: PropTypes.func,
};

ChatList.defaultProps = {
  onlineUsers: [],
  newMessagesAlert: [],
  handleDeleteChat: null,
};

export default ChatList;

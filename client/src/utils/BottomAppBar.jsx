import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../constants/Events";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useSocket } from "../socket";
import { Skeleton } from "@mui/material";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useMyChatsQuery } from '../redux/api/Api';
import List from '@mui/material/List';
import ChatList from '../components/specific/ChatList';
import { setUploadingLoader } from '../redux/reducers/misc';
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from '../redux/api/Api';

const BottomAppBar = ({ selectedAction, movie }) => {
  const params = useParams();
  const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useSocket();
  const dispatch = useDispatch();
  const chatId = params.chatId;
  useErrors([{ isError, error }]);
  const [sendAttachments] = useSendAttachmentsMutation();
  const refetchListener = useCallback(() => {
    refetch();
    navigate("/");
  }, [refetch, navigate]);

  const onlineUsersListener = useCallback((data) => {
    setOnlineUsers(data);
  }, []);

  const sendMoviePosterToChat = async (chatId) => {
    try {
      // Fetch the poster image as a blob
      const response = await fetch(movie.Poster);
      const blob = await response.blob();
      const file = new File([blob], "poster.jpg", { type: blob.type });

      // Create a FormData object
      const formData = new FormData();
      formData.append("chatId", chatId);
      formData.append("files", file);

      // Send the attachment
      dispatch(setUploadingLoader(true));
      const toastId = toast.loading(`Sending ${selectedAction}...`);

      const res = await sendAttachments(formData).unwrap();

      if (res) {
        toast.success(`${selectedAction} sent successfully`, { id: toastId });
      } else {
        toast.error(`Failed to send ${selectedAction}`, { id: toastId });
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  const eventHandlers = {
    [REFETCH_CHATS]: refetchListener,
    [ONLINE_USERS]: onlineUsersListener,
  };

  useSocketEvents(socket, eventHandlers);

  return (
    <React.Fragment>
      <Paper
        square
        ClickAwayListener
        sx={{
          width: '100%',
          maxWidth: '390px',
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          top: '80px',
          transform: 'translateX(-50%)',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 70px)',
          borderRadius: '8px',
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'transparent',
          },
          '&:hover::-webkit-scrollbar': {
            backgroundColor: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
          },
          '&:hover::-webkit-scrollbar-thumb': {
            backgroundColor: '#555',
          },
        }}
      >
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0, display: 'flex', justifyContent: 'center' }}>
          All chats
        </Typography>
        <List sx={{ mb: 2 }}>
          {isLoading ? (
            <Skeleton />
          ) : (
            <ChatList
              w="24.3vw"
              chats={data?.chats}
              chatId={chatId}
              onChatSelect={sendMoviePosterToChat}
              onlineUsers={onlineUsers}
            />
          )}
        </List>
      </Paper>
    </React.Fragment>
  );
};

BottomAppBar.propTypes = {
  selectedAction: PropTypes.string.isRequired,
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
  }).isRequired,
};

export default BottomAppBar;

import { Drawer, Grid, Skeleton } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../utils/ThemeProvider.jsx"; 
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constants/Events.js";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveFromStorage } from "../../libs/Features.js";
import { useMyChatsQuery } from "../../redux/api/Api.js";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { useSocket } from "../../socket";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";

const AppLayout = (WrappedComponent) => {
  const Component = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = useSocket();
    const { mode } = useTheme();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);
    
    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"}
        sx={{ mt: '-65px' }}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              bgcolor: mode === 'dark' ? '#2c2c2c' : "#e0e0e0",
              color: mode === 'dark' ? '#2c2c2c' : "#e0e0e0",
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>

          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: mode === 'dark' ? '#2c2c2c' : "#e0e0e0",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };

  return Component;
};

export default AppLayout;
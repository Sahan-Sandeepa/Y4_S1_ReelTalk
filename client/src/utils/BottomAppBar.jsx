import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../constants/Events";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useSocket } from "../socket";
import DeleteChatMenu from "../components/dialogs/DeleteChatMenu";
import { Skeleton } from "@mui/material";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import { useMyChatsQuery } from '../redux/api/Api';
import List from '@mui/material/List';
import ChatList from '../components/specific/ChatList';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const BottomAppBar = () => {
  const params = useParams();
  const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useSocket();
  console.log(' -------------------------');
  console.log('BottomAppBar  data:', data);
  console.log(' -------------------------');

  const chatId = params.chatId;
  useErrors([{ isError, error }]);

  const refetchListener = useCallback(() => {
    refetch();
    navigate("/");
  }, [refetch, navigate]);

  const onlineUsersListener = useCallback((data) => {
    setOnlineUsers(data);
  }, []);

  const eventHandlers = {
    [REFETCH_CHATS]: refetchListener,
    [ONLINE_USERS]: onlineUsersListener,
  };

  useSocketEvents(socket, eventHandlers);

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper
        square
        sx={{
          width: '100%',
          maxWidth: '390px',
          position: 'fixed',
          bottom: '70px',
          left: '50%',
          top: '80px',
          transform: 'translateX(-50%)',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 70px)',
          borderRadius: '8px',
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
            />
          )}
        </List>
      </Paper>
      {/* <AppBar position="fixed" color="primary" sx={{ top: 'auto',  maxWidth: '400px', position: 'fixed', bottom: 6,
          left: '36.87%', }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}
    </React.Fragment>
  );
};

export default BottomAppBar;

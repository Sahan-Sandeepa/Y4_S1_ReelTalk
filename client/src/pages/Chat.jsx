// eslint-disable-next-line no-unused-vars
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTheme } from "../utils/ThemeProvider.jsx";
import PropTypes from "prop-types";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack, Tooltip } from "@mui/material";
import { grayColor, orange } from "../constants/Color.js";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  Block as BlockIcon,
  Warning as WarningIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { InputBox } from "../components/styles/StyledComponent";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponet.jsx";
import { useSocket } from "../socket";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/Events.js";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/Api.js";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loaders";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useTheme();
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const [warning, setWarning] = useState(null);
  const [warningVisible, setWarningVisible] = useState(false);
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
  const [IsScannerOn, setScannerOn] = useState(() => {
    return sessionStorage.getItem('IsScannerOn') === 'true';
  });

  useEffect(() => {
    sessionStorage.setItem('IsScannerOn', IsScannerOn);
  }, [IsScannerOn]);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  const checkForBadWords = async (message) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/message/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const result = await response.json();

      if (result.prediction === 1) {
        return 'Your message contains inappropriate content.';
      }
      return null;
    } catch (error) {
      console.error('Error checking message:', error);
      return 'Error checking message.';
    }
  };

  const handleAccept = () => {
    setWarning(null);
    setWarningVisible(false);
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const handleReject = () => {
    setWarning(null);
    setWarningVisible(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const warningMessage = await checkForBadWords(message);

    if (warningMessage && IsScannerOn) {
      setWarning(warningMessage);
      setWarningVisible(true);
    } else {
      socket.emit(NEW_MESSAGE, { chatId, members, message });
      setMessage("");
    }
  };

  const messageOnChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, 2000);
  };

  useSocketEvents(socket, eventHandler);
  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment sx={{ bgcolor: mode === 'dark' ? 'red' : "#e0e0e0" }}>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          bgcolor: mode === 'dark' ? '#fff' : "#eceff1",
          overflowX: "hidden",
          overflowY: "auto",
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f5f5f5',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
          transition: 'scrollbar-width 0.3s ease',
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {userTyping && <TypingLoader />}

        {warningVisible && IsScannerOn && (
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '1rem',
            backgroundColor: 'rgba(255,0,0,0.8)',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '0.3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000,
            margin: '0 0 18rem 28rem',
            width: 'calc(35% - 1rem)',
            height: 'calc(15% - 1rem)'
          }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <WarningIcon style={{ color: 'yellow' }} />
              {warning}
            </span>
            <div>
              <Tooltip title="Send">
                <IconButton onClick={handleAccept} style={{ color: 'white' }}>
                  <SendIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Block">
                <IconButton onClick={handleReject} style={{ color: 'white' }}>
                  <BlockIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </Stack>

      <form
        style={{
          height: "10%",
          position: "relative",
          pointerEvents: warningVisible && IsScannerOn ? 'none' : 'auto',
          opacity: warningVisible && IsScannerOn ? 0.5 : 1,
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
          borderRadius={0.7}
          boxShadow={"0 0 5px 0 rgba(1, 1, 1, 0.1)"}
          sx={{ bgcolor: mode === 'dark' ? '#2c2c2c' : "#e0e0e0" }}
        >
          <AssignmentIcon
            sx={{
              position: "absolute",
              left: "1.9rem",
              bgcolor: green[300],
              borderRadius: 1
            }}
            onClick={handleFileOpen}
          >
            <Tooltip title="Attach file">
              <AttachFileIcon />
            </Tooltip>
          </AssignmentIcon>

          <InputBox
            placeholder="Type a message"
            value={message}
            sx={{ height: "3rem", width: "100%", borderRadius: 1 }}
            onChange={messageOnChange}
            disabled={warningVisible && IsScannerOn}
          />

          <IconButton
            sx={{
              position: "fixed",
              right: "29rem",
            }}>
            <Tooltip title="Scan Content">
              {IsScannerOn ? <VisibilityIcon onClick={() => setScannerOn(false)}></VisibilityIcon> : <VisibilityOffIcon onClick={() => setScannerOn(true)}></VisibilityOffIcon>}
            </Tooltip>
          </IconButton>

          <IconButton
            type="submit"
            sx={{
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

Chat.propTypes = {
  chatId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppLayout(Chat);

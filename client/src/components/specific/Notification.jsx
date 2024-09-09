import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { memo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/Api.js";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  const friendRequestHandler = async ({ _id, accept }) => {
    await acceptRequest("Processing...", { requestId: _id, accept });
    closeHandler();
  };

  const bulkActionHandler = async (accept) => {
    if (data && data.allRequests) {
      for (const { _id } of data.allRequests) {
        await friendRequestHandler({ _id, accept });
      }
      closeHandler();
    }
  };

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <DialogTitle>Notifications</DialogTitle>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Accept All" arrow>
              <IconButton color="primary" onClick={() => bulkActionHandler(true)}>
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reject All" arrow>
              <IconButton color="error" onClick={() => bulkActionHandler(false)}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              <>
                {data.allRequests.map(({ sender, _id }) => (
                  <NotificationItem
                    sender={sender}
                    _id={_id}
                    handler={friendRequestHandler}
                    key={_id}
                  />
                ))}
              </>
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "300px",
            whiteSpace: "nowrap"
          }}
        >
          <Tooltip title={`${name} wants to add you as a friend.`} arrow>
            <span>{`${name} wants to add you as a friend.`}</span>
          </Tooltip>
        </Typography>
        <Stack direction={"row"} spacing={1} width="100%" justifyContent="space-between">
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#6C63FF",
              color: "#fff",
              '&:hover': {
                backgroundColor: "#5348C7"
              }
            }}
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: "8px",
              borderColor: "#D32F2F",
              color: "#D32F2F",
              '&:hover': {
                backgroundColor: "rgba(211, 47, 47, 0.1)",
              }
            }}
            onClick={() => handler({ _id, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

NotificationItem.displayName = "NotificationItem";

NotificationItem.propTypes = {
  sender: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  _id: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default Notifications;
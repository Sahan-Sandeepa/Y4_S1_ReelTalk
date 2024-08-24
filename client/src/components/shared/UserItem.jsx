// eslint-disable-next-line no-unused-vars
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Add as AddIcon, Remove as RemoveIcon} from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography, Tooltip } from "@mui/material";
import { transformImage } from "../../libs/Features";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar src={transformImage(avatar)} />

        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "rgb(36 198 143)",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" : "rgb(106 225 190)",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? <Tooltip title="Remove Members"><RemoveIcon /></Tooltip> : <Tooltip title="Add Members"><AddIcon /></Tooltip>}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  handler: PropTypes.func.isRequired,
  handlerIsLoading: PropTypes.bool,
  isAdded: PropTypes.bool,
  styling: PropTypes.object,
};

export default memo(UserItem);

// eslint-disable-next-line no-unused-vars
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useTheme } from "../utils/ThemeProvider.jsx";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import { Link } from "../components/styles/StyledComponent";
import { matBlack } from "../constants/Color";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../components/shared/UserItem";
import { customStyles } from "../utils/ScrollBar.js";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/Api.js";
import { motion } from "framer-motion";
import { setIsAddMember } from "../redux/reducers/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);
  const myGroups = useMyGroupsQuery("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [members, setMembers] = useState([]);
  const { mode } = useTheme();

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

const [loadingGroupName, setLoadingGroupName] = useState(true);

useEffect(() => {
  if (groupDetails.data) {
    setGroupName(groupDetails.data.chat.name);
    setGroupNameUpdatedValue(groupDetails.data.chat.name);
    setMembers(groupDetails.data.chat.members);
    setLoadingGroupName(false);
  }
}, [groupDetails.data, updateGroup, setGroupName]);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "-3rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            sx={{ color: mode === "dark" ? "#fff" : "2c2c2c" }}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName} sx={{ color: mode === "dark" ? "#fff" : "2c2c2c", }}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          {loadingGroupName ? (
              <Typography variant="h4"><CircularProgress/></Typography>
            ) : (
              <Typography variant="h4" sx={{ pl: '2rem' }}>{groupName}</Typography>
            )}
          <IconButton
            disabled={isLoadingGroupName}
            onClick={() => setIsEdit(true)}
            sx={{ color: mode === "dark" ? "#fff" : "2c2c2c", }}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="medium"
        sx={{
          backgroundColor: '#ee243e',
          color:"white",
          ":hover": {
                    backgroundColor: '#cb243d',
                    },}}
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="medium"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} mode={mode}/>
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
          {groupName && (
            <>
            <Typography
            sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: mode === "dark" ? "#fff" : "2c2c2c",
                }}>
                {GroupName}
            </Typography>

              <Stack
                direction="row"
                justifyContent="center"
                marginBottom="1rem"               
              >
                <Typography
                  variant="body2"
                  textAlign="center" 
                  sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: mode === "dark" ? "#fff" : "2c2c2c",
                }}
                >
                  Members
                </Typography>
              </Stack>

              <Stack
                sx={{ ...customStyles.stackContainer, ...customStyles.scrollbarContainer }}
                spacing={"0.5rem"}
              >
                {/* Members */}

                {isLoadingRemoveMember ? (
                  <CircularProgress />
                ) : (
                  members.map((i) => (
                    <UserItem
                      user={i}
                      key={i._id}
                      isAdded
                      styling={{
                        boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                        padding: "1rem 2rem",
                        borderRadius: "1rem",
                        color: "2c2c2c",
                        backgroundColor: "#fff", 
                      }}
                      handler={removeMemberHandler}
                    />
                  ))
                )}
              </Stack>

              {ButtonGroup}
            </>
          )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList
          w={"50vw"}
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
          mode={mode}
        />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId, mode = {} }) => (
  <Stack
    width={w}
    sx={{
      backgroundColor: mode === 'dark' ? '#2c2c2c' : "#e0e0e0",
      height: "100vh",
      overflow: "auto",
      width: "80%",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem" sx={{ color: mode === "dark" ? "#fff" : "2c2c2c", }}>
        No groups
      </Typography>
    )}
  </Stack>
);

GroupsList.propTypes = {
  w: PropTypes.string,
  myGroups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ),
  chatId: PropTypes.string,
  mode: PropTypes.object,
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.01 }}
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          backgroundColor: "white",
          color: "black",
          position: "relative",
          padding: "0.75rem",
          borderRadius: "0.75rem",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "0.75rem",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          <AvatarCard avatar={avatar} />
          <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
        </Stack>
      </motion.div>
    </Link>
  );
});

GroupListItem.displayName = 'GroupListItem';

GroupListItem.propTypes = {
  group: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  chatId: PropTypes.string,
};

export default Groups;
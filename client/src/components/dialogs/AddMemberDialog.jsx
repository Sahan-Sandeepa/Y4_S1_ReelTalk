import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import UserItem from "../shared/UserItem.jsx";
import {
  useAddGroupMembersMutation,
  useGetUsersCreatedByMeQuery,
} from "../../redux/api/Api.js";
import { useAsyncMutation, useErrors } from "../../hooks/hook.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc.js";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);
  const loggedInUserId = localStorage.getItem('userID');
  // const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
  const { data: createdUsers, isLoading: usersLoading, error: usersError, refetch, error } = useGetUsersCreatedByMeQuery(loggedInUserId);
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    if (isAddMember === false) {
      refetch();
    }
  }, [isAddMember, refetch]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  const addMemberSubmitHandler = () => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  useErrors([{ usersError, error }]);
  return (
    <Dialog open={isAddMember} onClose={closeHandler} sx={{ ml: 60 }}>
      <Stack p={"1.5rem"} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1rem"}>
          {usersLoading ? (
            <Skeleton />
          ) : createdUsers?.users.length > 0 ? (
            createdUsers?.users?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

AddMemberDialog.propTypes = {
  chatId: PropTypes.string.isRequired,
};

export default AddMemberDialog;

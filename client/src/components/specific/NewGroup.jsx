import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import UserItem from "../shared/UserItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUsersCreatedByMeQuery,
  useNewGroupMutation,
  useCreateRequestMutation,
} from "../../redux/api/Api.js";
import GroupsIcon from '@mui/icons-material/Groups';
import { useAsyncMutation, useErrors } from "../../hooks/hook.jsx";
import UserDetailsForm from "../shared/UseDetailsForm.jsx";
import { setIsNewGroup } from "../../redux/reducers/misc.js";
import toast from "react-hot-toast";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const loggedInUserId = localStorage.getItem('userID');
  const dispatch = useDispatch();
  // const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, { isLoading: isLoadingNewGroup }] = useAsyncMutation(useNewGroupMutation);
  const groupName = useInputValidation("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [isUserDetailsFormOpen, setIsUserDetailsFormOpen] = useState(false);
  const [createRequest] = useCreateRequestMutation();
  const { data: createdUsers, isLoading: usersLoading, error: usersError, refetch } = useGetUsersCreatedByMeQuery(loggedInUserId);
  const errors = [{ usersLoading, usersError }];
  useErrors(errors);

  useEffect(() => {
    if (isUserDetailsFormOpen === false) {
      refetch();
    }
  }, [isUserDetailsFormOpen, refetch]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currId) => currId !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {

    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 3)
      return toast.error("Please select at least 3 members");

    // First, create the group
    newGroup("Creating group...", { name: groupName.value, members: selectedMembers })
      .then(() => {
        const createRequestPromises = selectedMembers.map((receiverId) =>
          createRequest({
            parentUserId: user._id,
            groupName: groupName.value,
            receiverId: receiverId,
          })
        );
        Promise.all(createRequestPromises)
          .then(() => {
            toast.success("Group and requests created successfully");
            closeHandler();
          })
          .catch(() => toast.error("Failed to create requests for some users"));
      })
      .catch(() => toast.error("Failed to create group"));
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <>
      <Dialog onClose={closeHandler} open={isNewGroup}>
        <Stack p={{ xs: "1rem", sm: "3rem" }}
          width={"25rem"}
          spacing={"2rem"}
          sx={{
            maxHeight: '80vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
          }}>
          <DialogTitle textAlign={"center"} variant="h5">
            Create Group
          </DialogTitle>

          <Stack spacing={1}>
            <TextField
              required
              label="Group Name"
              value={groupName.value}
              onChange={groupName.changeHandler}
              fullWidth
            />
          </Stack>

          <Stack
            direction="row"
            justifyContent="center"
            marginBottom="1rem"
          >
            <Typography
              variant="body2"
              textAlign="left"
              sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center' }}
            >
              Add Member
              <GroupsIcon
                sx={{
                  cursor: 'pointer',
                  color: '#3c3c3c',
                  marginLeft: '0.6rem',
                  '&:hover': {
                    color: '#898989'
                  }
                }}
                onClick={() => setIsUserDetailsFormOpen(true)}
              />
            </Typography>
          </Stack>

          <Stack spacing={1}>
            {usersLoading ? (
              <Skeleton variant="rectangular" height={48} />
            ) : (
              createdUsers?.users?.map((user) => (
                <UserItem
                  user={user}
                  key={user._id}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              ))
            )}
          </Stack>

          <Stack direction={"row"} justifyContent={"space-evenly"}>
            <Button
              color="error"
              size="medium"
              variant="contained"
              onClick={closeHandler}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={submitHandler}
              disabled={isLoadingNewGroup}
            >
              {isLoadingNewGroup ? "Creating..." : "Create"}
            </Button>
          </Stack>
        </Stack>
      </Dialog>

      {isUserDetailsFormOpen && (
        <UserDetailsForm
          onClose={() => setIsUserDetailsFormOpen(false)}
        />
      )}
    </>
  );
};

export default NewGroup;
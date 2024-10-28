import { useState } from 'react';
import { Dialog, Stack, TextField, Button, DialogTitle, Avatar, IconButton } from '@mui/material';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { server } from '../../constants/config';

const UserDetailsForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const { user } = useSelector((state) => state.auth);
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const handleDateChange = (date) => {
    setBirthDate(date);
  };

  const calculateAge = (date) => {
    if (!date) return null;
    const today = new Date();
    const birthDate = new Date(date);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();

    if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
      ageMonths = 12 + ageMonths;
    }
    if (ageYears === 0) {
      return ageMonths > 0 ? ageMonths : 0;
    }

    return ageMonths > 0 ? ageYears + ageMonths / 12 : ageYears;
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!name || !username || !password) {
      return toast.error("Name, Username, and Password are required");
    }
    const age = calculateAge(birthDate);
    setIsLoading(true);
    const toastId = toast.loading("Submitting...");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("age", age);
      if (avatar) formData.append("avatar", avatar);
      formData.append("createdBy", user._id);

      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      toast.success(data.message, {
        id: toastId,
      });
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
          Add User
        </DialogTitle>

        <Stack spacing={2}>
          <Stack alignItems="center" position="relative">
            <Avatar
              sx={{
                width: "10rem",
                height: "10rem",
                objectFit: "cover",
                border: `2px solid #ccc`,
              }}
              src={avatarPreview}
            />
            <IconButton
              sx={{
                position: "sticky",
                bottom: 8,
                marginTop: -4,
                width: "3rem",
                height: "3rem",
                marginLeft: 15,
                right: 8,
                color: "#fff",
                bgcolor: "#ccc",
                ":hover": {
                  bgcolor: "#888",
                },
              }}
              component="label"
            >
              <CameraAltIcon />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </IconButton>
          </Stack>

          <TextField
            required
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            required
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            required
            label="Birth Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={birthDate}
            onChange={(e) => handleDateChange(e.target.value)}
            fullWidth
          />
          <TextField
            required
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            color="error"
            size="medium"
            variant="contained"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

UserDetailsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UserDetailsForm;
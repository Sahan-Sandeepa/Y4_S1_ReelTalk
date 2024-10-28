// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import { orange, lightBlue, purple, purpleLight } from "../constants/Color.js";
import { server } from "../constants/config.js";
import { userExists } from "../redux/reducers/auth.js";
import { usernameValidator } from "../utils/Validators.js"; 
import PickTheDate from "../components/shared/DatePicker";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const handleDateChange = (date) => {
    setBirthDate(date);
  };
  const calculateAge = (date) => {
    if (!date) return null;
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const age = calculateAge(birthDate);
    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("age", age);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLogin = () => setIsLogin((prev) => !prev);
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      localStorage.setItem('userID', data.user._id);
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: "100vh", padding: "2rem" }}>
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            mt: '5.5rem',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "8px",
            backgroundColor: '#fff',
            boxShadow: `0px 4px 20px ${'lightgray'}`,
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h4" color={'black'} sx={{ fontSize: '18px', lineHeight: '22px' }} gutterBottom>
                Log in to FamilyFrame
              </Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  sx={{ backgroundColor: "#fff" }}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  sx={{ backgroundColor: "#fff" }}
                />
                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: '#5542f6',
                    color: "#fff",
                    ":hover": {
                      backgroundColor: 'darkkblue',
                    },
                  }}
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Log In
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
                    <hr
                      style={{
                        flexGrow: 1,
                        border: 0,
                        borderTop: '1px solid #dadde1',
                        margin: 0,
                      }}
                    />
                    <span style={{ margin: '0 1rem', color: '#666' }}>OR</span>
                    <hr
                      style={{
                        flexGrow: 1,
                        border: 0,
                        borderTop: '1px solid #dadde1',
                        margin: 0,
                      }}
                    />
                  </div>

                </Typography>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '1rem 0',
                  }}
                >
                  <Button
                    disabled={isLoading}
                    fullWidth
                    variant="text"
                    onClick={toggleLogin}
                    sx={{
                      marginTop: "0.2rem",
                      backgroundColor: '#36a420',
                      color: "#fff",
                      ":hover": {
                        backgroundColor: 'darkgreen',
                      },
                      justifyContent: "center",
                    }}
                  >
                    Sign Up
                  </Button>
                </div>                
              </form>
            </>
          ) : (
            <>
              <Typography variant="h4" color={lightBlue} gutterBottom>
                Sign Up
              </Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                      border: `2px solid ${purple}`,
                    }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "#fff",
                      bgcolor: purpleLight,
                      ":hover": {
                        bgcolor: purple,
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                  sx={{ backgroundColor: "#fff" }}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  sx={{ backgroundColor: "#fff" }}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  sx={{ backgroundColor: "#fff" }}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}                
                <PickTheDate onChange={handleDateChange} />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  sx={{ backgroundColor: "#fff" }}
                />
                <Button
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: lightBlue,
                    color: "#fff",
                    ":hover": {
                      backgroundColor: purple,
                    },
                  }}
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
                  <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
                    <hr
                      style={{
                        flexGrow: 1,
                        border: 0,
                        borderTop: '1px solid #dadde1',
                        margin: 0,
                      }}
                    />
                    <span style={{ margin: '0 1rem', color: '#666' }}>OR</span>
                    <hr
                      style={{
                        flexGrow: 1,
                        border: 0,
                        borderTop: '1px solid #dadde1',
                        margin: 0,
                      }}
                    />
                  </div>

                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                  sx={{ color: orange }}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;

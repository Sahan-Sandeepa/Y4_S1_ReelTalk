// eslint-disable-next-line no-unused-vars
import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/Color";

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
      Start a new Chat
      </Typography>
    </Box>
  );
};

export default AppLayout(Home);
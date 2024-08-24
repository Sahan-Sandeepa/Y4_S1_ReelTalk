import { Grid, Skeleton, Stack } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { BouncingSkeleton } from "../styles/StyledComponent"; 
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const LayoutLoader = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        height={"100%"}
      >
        <Skeleton
          variant="rectangular"
          height={"100vh"}
          sx={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 75%)",
            backgroundSize: "200% 100%",
            animation: `${shimmer} 1.5s infinite`
          }}
        />
      </Grid>

      <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
        <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={"5rem"}
              sx={{
                background: "linear-gradient(90deg, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 75%)",
                backgroundSize: "200% 100%",
                animation: `${shimmer} 1.5s infinite`
              }}
            />
          ))}
        </Stack>
      </Grid>

      <Grid
        item
        md={4}
        lg={3}
        height={"100%"}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Skeleton
          variant="rectangular"
          height={"100vh"}
          sx={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 75%)",
            backgroundSize: "200% 100%",
            animation: `${shimmer} 1.5s infinite`
          }}
        />
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
    return (
        <Stack
            spacing={"0.5rem"}
            direction={"row"}
            padding={"0.5rem"}
            justifyContent={"center"}
        >
            <BouncingSkeleton
                variant="circular"
                width={15}
                height={15}
                style={{
                    animationDelay: "0.1s",
                }}
            />
            <BouncingSkeleton
                variant="circular"
                width={15}
                height={15}
                style={{
                    animationDelay: "0.2s",
                }}
            />
            <BouncingSkeleton
                variant="circular"
                width={15}
                height={15}
                style={{
                    animationDelay: "0.4s",
                }}
            />
            <BouncingSkeleton
                variant="circular"
                width={15}
                height={15}
                style={{
                    animationDelay: "0.6s",
                }}
            />
        </Stack>
    );
};

export { TypingLoader, LayoutLoader };
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../utils/ThemeProvider";
import { Avatar, Stack, Typography, Box } from "@mui/material";
import {
  Face as FaceIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import moment from "moment";
import { transformImage } from "../../libs/Features";

const Profile = ({ user }) => {
  const { mode } = useTheme();
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} width="100%">
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: mode === "dark" ? "5px solid white" : "5px solid #bdbdbd",
        }}
      />      
      <ProfileCard text={user?.name} heading={"Name"} style={{ color: mode === 'dark' ? '#fff' : "#424242", }} Icon={<FaceIcon />} />
      <ProfileCard heading={"About"} text={user?.bio} style={{ color: mode === 'dark' ? '#fff' : "#424242", }} Icon={<InfoIcon />} />
      <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} style={{ color: mode === 'dark' ? '#fff' : "#424242", }} Icon={<CalendarIcon />} />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading, style = {} }) => (
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        color={style}
        textAlign={"center"}
        justifyContent={"flex-start"}
        sx={{width: "100%"}}
      >
    {Icon && (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          color: {style},
        }}
      >
        {React.cloneElement(Icon, { sx: { fontSize: '2rem' } })}
      </Box>
    )}
    <Stack alignItems={"flex-start"}>
      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
        {heading}
      </Typography>
      <Typography variant="body1" sx={{ pt: '1px' }}>{text}</Typography>
    </Stack>
  </Stack>
);


Profile.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
    bio: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

ProfileCard.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.element,
  heading: PropTypes.string.isRequired,
  style: PropTypes.object,  
};

export default Profile;

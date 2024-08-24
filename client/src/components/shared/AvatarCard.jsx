import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from 'prop-types';
import { transformImage } from "../../libs/Features";

// Todo Transform
const AvatarCard = ({ avatar = [], max = 6 }) => {
    return (
        <Stack direction={"row"} spacing={0.5}>
            <AvatarGroup
                max={max}
                sx={{
                    position: "relative",
                }}
            >
                <Box width={"5rem"} height={"3rem"}>
                    {avatar.map((i, index) => (
                        <Avatar
                            key={index}  // Use index or a unique id if available
                            src={transformImage(i)}
                            alt={`Avatar ${index}`}
                            sx={{
                                width: "3rem",
                                height: "3rem",
                                position: "absolute",
                                left: {
                                    xs: `${0.5 + index}rem`,
                                    sm: `${index}rem`,
                                },
                            }}
                        />
                    ))}
                </Box>
            </AvatarGroup>
        </Stack>
    );
};

AvatarCard.propTypes = {
    avatar: PropTypes.arrayOf(PropTypes.string).isRequired,
    max: PropTypes.number,
};

export default AvatarCard;

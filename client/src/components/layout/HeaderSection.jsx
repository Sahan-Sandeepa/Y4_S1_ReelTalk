// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { useTheme } from '../../utils/ThemeProvider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import PropTypes from 'prop-types';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuPopupState from '../../utils/MenuIcons';

const Layout = ({ 
    children, 
    navigateToGroup, 
    openNewGroup, 
    openSearch, 
    openNotification, 
    logoutHandler, 
    notificationCount 
}) => {
    const { mode, toggleMode } = useTheme();

    return (
        <Box sx={{ flexGrow: 1, bgcolor: mode === 'dark' ? '#202020' : '#fff' }}>
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: mode === 'dark' ? '#202020' : '#fff',
                    height: "4rem",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" sx={{ color: mode === 'dark' ? '#fff' : '#202020' }}>
                        FamilyFrame
                    </Typography>
                    <Box>
                        <IconBtn
                            title={"Create New Group"}
                            icon={<Diversity1Icon />}
                            onClick={openNewGroup}
                            sx={{ color: mode === 'dark' ? '#fff' : '#202020', '&:hover': { bgcolor: 'darkgray' } }}
                        />
                        <IconBtn
                            title={"Search"}
                            icon={<SearchIcon />}
                            onClick={openSearch}
                            sx={{ color: mode === 'dark' ? '#fff' : '#202020', '&:hover': { bgcolor: 'darkgray' } }}
                        />
                        <IconBtn
                            title={"Notifications"}
                            icon={<NotificationsNoneIcon />}
                            onClick={openNotification}
                            value={notificationCount}
                            sx={{ color: mode === 'dark' ? '#fff' : '#202020', '&:hover': { bgcolor: 'darkgray' } }}
                        />
                        <MenuPopupState
                            logoutHandler={logoutHandler}
                            navigateToGroup={navigateToGroup}
                            toggleMode={toggleMode}
                            mode={mode}
                            sx={{ color: mode === 'dark' ? '#fff' : '#202020', '&:hover': { bgcolor: 'darkgray' } }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ mt: "4rem" }}>
                <Box component="main">
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

const IconBtn = ({ title, icon, onClick, value, sx = {} }) => {
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" size="large" sx={sx} onClick={onClick}>
                {value ? (
                    <Badge badgeContent={value} color="error">
                        {icon}
                    </Badge>
                ) : (
                    icon
                )}
            </IconButton>
        </Tooltip>
    );
};

IconBtn.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.number,
    sx: PropTypes.object,
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    navigateToGroup: PropTypes.func,
    openNewGroup: PropTypes.func,
    openSearch: PropTypes.func,
    openNotification: PropTypes.func,
    logoutHandler: PropTypes.func,
    notificationCount: PropTypes.number,
};

export default Layout;
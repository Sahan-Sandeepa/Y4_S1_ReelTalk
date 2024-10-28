import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SettingsIcon from '@mui/icons-material/Settings';
import PropTypes from 'prop-types';

const MenuPopupState = ({
    logoutHandler,
    navigateToGroup,
    toggleMode,
    mode,
    sx = {}
}) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <PopupState variant="popover" popupId="menu-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <IconButton color="inherit" {...bindTrigger(popupState)} sx={sx}>
                        <SettingsIcon />
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={() => { toggleMode(); popupState.close(); }}>
                            {mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        </MenuItem>
                        <MenuItem onClick={() => { navigateToGroup(); popupState.close(); }}>
                            Manage Groups
                        </MenuItem>
                        {user?.age >= 18 && (
                            <MenuItem
                                onClick={() => {
                                    navigate('/admin');
                                    popupState.close();
                                }}
                            >
                                Monitoring
                            </MenuItem>
                        )}

                        {/* New 'My Chats' Section */}
                        <MenuItem
                            onClick={() => {
                                navigate('/Home/chat');
                                popupState.close();
                            }}
                        >
                            My Chats
                        </MenuItem>

                        <MenuItem onClick={() => { logoutHandler(); popupState.close(); }}>
                            Logout
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
};

MenuPopupState.propTypes = {
    logoutHandler: PropTypes.func.isRequired,
    navigateToGroup: PropTypes.func.isRequired,
    toggleMode: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    sx: PropTypes.object,
};

export default MenuPopupState;

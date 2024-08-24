import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this group?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={deleteHandler} color="error">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmDeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
};

export default ConfirmDeleteDialog;

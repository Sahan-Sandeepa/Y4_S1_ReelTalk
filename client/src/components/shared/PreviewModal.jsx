/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal, Box, IconButton, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from '@mui/icons-material/Image';
import AudioFile from '@mui/icons-material/AudioFile';
import VideoFile from '@mui/icons-material/VideoFile';
import UploadFile from '@mui/icons-material/UploadFile';

// eslint-disable-next-line react/prop-types
const PreviewModal = ({ files, onSend, onReject }) => {
  return (
    <Modal
      open
      onClose={onReject}
      aria-labelledby="preview-modal-title"
      aria-describedby="preview-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
          overflow: 'auto',
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 0, right: 0 }}
          onClick={onReject}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" component="h2">
          File Preview
        </Typography>

        <Box sx={{ mt: 2 }}>
          {files.map((file, index) => {
            const fileType = file.split('.').pop().toLowerCase();

            return (
              <Box key={index} sx={{ mb: 2 }}>
                {fileType === 'png' || fileType === 'jpeg' || fileType === 'jpg' ? (
                  <img src={file} alt="preview" style={{ maxWidth: '100%', height: 'auto' }} />
                ) : fileType === 'mp3' || fileType === 'wav' ? (
                  <audio controls>
                    <source src={file} type={`audio/${fileType}`} />
                    Your browser does not support the audio element.
                  </audio>
                ) : fileType === 'mp4' || fileType === 'webm' ? (
                  <video controls style={{ maxWidth: '100%', height: 'auto' }}>
                    <source src={file} type={`video/${fileType}`} />
                    Your browser does not support the video element.
                  </video>
                ) : (
                  <Typography>No preview available for this file type.</Typography>
                )}
              </Box>
            );
          })}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={onSend}>
            Send
          </Button>
          <Button variant="outlined" color="secondary" onClick={onReject} sx={{ ml: 2 }}>
            Reject
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PreviewModal;

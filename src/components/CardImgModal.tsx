import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import useMediaQuery from '@mui/material/useMediaQuery';

const style = {
  position: 'absolute' as 'absolute',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 12,
  overflow: 'hidden',
  height: { xs: 'auto', sm: '100vh' },
  width: { xs: '100vw', sm: 'auto' },
};

interface CardModalProps {
  cardShow: boolean;
  imageUrl: string;
  handleModal: (open: boolean) => void;
}

export default function CardImgModal(props: CardModalProps) {
  const { cardShow, imageUrl, handleModal } = props;
  const matches = useMediaQuery('(min-width:600px)');

  const handleClose = () => {
    handleModal(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={cardShow}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
        sx={{ overflow: 'scroll' }}
      >
        <Fade in={cardShow}>
          <Box sx={style}>
            {matches ? (
              <img src={imageUrl} alt="realItem" height="100%" />
            ) : (
              <img src={imageUrl} alt="realItem" height="auto" width="100%" />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

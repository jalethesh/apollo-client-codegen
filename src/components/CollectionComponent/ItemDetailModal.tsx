import React, { useState, useEffect, useCallback } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  IconButton,
  TextField,
  Button,
  MobileStepper,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';

import MediaUpload from './MediaUpload';
import { useKey } from '../../helpers/Hooks/useKey';

import {
  RealItemObject,
  useDeleteMediaMutation,
  useGetMediaQuery,
  useUpdateMediaMutation,
} from '../../types/graphql';
import { GET_REAL_ITEM_MEDIAS } from '../../graphql/queries';

interface ItemDetailModalProps {
  open: boolean;
  item: RealItemObject;
  onClose: any;
  type?: string;
}

export default function ItemDetailModal(props: ItemDetailModalProps) {
  const { open, item, onClose, type } = props;
  const [isShowEditLabel, showEditLabel] = useState(false);
  const [editLabel, setEditLabel] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<number | undefined>();
  const [activeStep, setActiveStep] = useState(0);
  const { data: dataMedia } = useGetMediaQuery({
    variables: { realItemId: parseInt(item.databaseId!) },
  });

  const [deleteMedia] = useDeleteMediaMutation({
    refetchQueries: [
      {
        query: GET_REAL_ITEM_MEDIAS,
        variables: {
          realItemId: parseInt(item.databaseId!),
        },
      },
    ],
  });
  const [updateMedia, { loading: isUpdating }] = useUpdateMediaMutation({
    refetchQueries: [
      {
        query: GET_REAL_ITEM_MEDIAS,
        variables: {
          realItemId: parseInt(item.databaseId!),
        },
      },
    ],
  });

  const maxSteps = dataMedia ? dataMedia?.media?.length! : 0;

  const handleNext = useCallback(
    (currentActiveStep: number) => {
      if (currentActiveStep < maxSteps)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    },
    [maxSteps],
  );

  const handleBack = useCallback((currentActiveStep: number) => {
    if (currentActiveStep > 0)
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleDelete = async (databaseId: number) => {
    try {
      await deleteMedia({ variables: { databaseId } });
    } catch (error) {
      toast.error(`${error}`, {
        theme: 'dark',
      });
    }
  };

  const handleEdit: React.FormEventHandler = async (e) => {
    try {
      e.preventDefault();
      await updateMedia({
        variables: {
          databaseId: selectedMedia!,
          label: editLabel,
        },
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: 'dark',
      });
    } finally {
      handleClose();
    }
  };

  const handleClose = () => showEditLabel(false);
  const keyRight = useKey('ArrowRight');
  const keyLeft = useKey('ArrowLeft');

  useEffect(() => {
    if (keyLeft) handleBack(activeStep);
    if (keyRight) handleNext(activeStep);
  }, [keyLeft, keyRight]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        aria-labelledby="item-dialog-title"
        aria-describedby="item-dialog-description"
        style={{ margin: 0 }}
      >
        <DialogTitle id="item-dialog-title">
          {item.genericItems?.edges[0]?.node?.name}
        </DialogTitle>
        <DialogContent dividers id="item-dialog-description">
          {dataMedia?.media && !!dataMedia.media.length && (
            <>
              <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {dataMedia.media.map((media, index) => (
                  <div key={media?.databaseId}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box component="p">
                            {media?.label === 'no-labels-here'
                              ? 'Default'
                              : media?.label}
                          </Box>
                          <Box>
                            {!(type === 'observer') && (
                              <IconButton
                                onClick={() =>
                                  handleDelete(
                                    parseInt(media?.databaseId!) || 0,
                                  )
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                            {/* <IconButton
                              onClick={() => {
                                showEditLabel(true);
                                setSelectedMedia(parseInt(media?.databaseId!));
                                setEditLabel(media?.label!);
                              }}
                            >
                              <EditIcon />
                            </IconButton> */}
                          </Box>
                        </Box>
                        <Box
                          component="img"
                          sx={{
                            height: '100%',
                            display: 'block',
                            maxWidth: 400,
                            objectFit: 'contain',
                            border: 6,
                            borderRadius: 4,
                            borderColor: 'purple',
                            margin: '0 auto',
                            width: '100%',
                          }}
                          src={media?.mediaUrl!}
                          alt={media?.label!}
                        />
                      </>
                    ) : null}
                  </div>
                ))}
                <Box
                  component="img"
                  sx={{
                    display: 'block',
                    maxWidth: 400,
                    objectFit: 'contain',
                    border: 6,
                    borderRadius: 4,
                    borderColor: 'purple',
                    margin: '0 auto',
                    width: '100%',
                  }}
                  src={item?.genericItems?.edges?.[0]?.node?.imageUriLarge!}
                  alt={item?.genericItems?.edges?.[0]?.node?.name!}
                />
              </SwipeableViews>
              <MobileStepper
                steps={maxSteps + 1}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={() => handleNext(activeStep)}
                    disabled={activeStep === maxSteps}
                  >
                    Next
                    <KeyboardArrowRight />
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={() => handleBack(activeStep)}
                    disabled={activeStep === 0}
                  >
                    <KeyboardArrowLeft />
                    Back
                  </Button>
                }
              />
            </>
          )}
          {!(type === 'observer') && (
            <MediaUpload
              real_item_id={item.databaseId}
              mediaOrder={dataMedia?.media?.length}
            />
          )}
          <Dialog
            open={isShowEditLabel}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
          >
            <form onSubmit={handleEdit}>
              <DialogTitle>Edit Media Label</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  id="name"
                  label="Media Label"
                  fullWidth
                  variant="standard"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                  loading={isUpdating}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  type="submit"
                >
                  Save
                </LoadingButton>
              </DialogActions>
            </form>
          </Dialog>
        </DialogContent>
      </Dialog>
    </>
  );
}

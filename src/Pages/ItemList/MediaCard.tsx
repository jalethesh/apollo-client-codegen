import React, { useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography, MobileStepper } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PanToolIcon from '@mui/icons-material/PanTool';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import SwipeableViews from 'react-swipeable-views';
import SelectCondition from '../../components/SelectCondition';
import { confirmDialog } from '../../components/ConfirmationDialog';
import ItemDetailModal from '../../components/CollectionComponent/ItemDetailModal';
import { toast } from 'react-toastify';
import { GlassMagnifier } from 'react-image-magnifiers';
import FullCardMagnify from '../../components/FullCardMagnify';
import {
  RealItemObject,
  useGetMediaQuery,
  useUpdateRealItemMutation,
  useGetMultiplierQuery,
} from '../../types/graphql';
import {
  GET_REAL_ITEMS_IN_ITEM_LIST,
  GET_ITEM_LISTS,
} from '../../graphql/queries';

interface MedidCardProps {
  item: RealItemObject;
  onDelete: (realItemId: string) => void;
  duplicateCard: (
    genericItemId: number,
    itemlistId: number,
    conditin: string,
  ) => void;
  page: number;
  perPage: number;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default function MediaCard(props: MedidCardProps) {
  const { item, duplicateCard, onDelete, page, perPage } = props;

  const [isOpenDetail, showDetail] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const realItemId = item.databaseId;
  const [zoom, setZoom] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    data: multipliersData,
    loading: multipliersLoading,
    error: multipliersError,
  } = useGetMultiplierQuery();

  const { data: dataMedias } = useGetMediaQuery({
    variables: { realItemId: parseInt(item.databaseId!) },
  });

  const [updateCondition, { loading: isUpdatingCondition }] =
    useUpdateRealItemMutation({
      refetchQueries: [
        {
          query: GET_REAL_ITEMS_IN_ITEM_LIST,
          variables: {
            itemListId: item.itemListId,
            page: page,
            perPage: perPage,
          },
        },
        {
          query: GET_ITEM_LISTS,
        },
      ],
    });

  const action = (key: string) => (
    <Button
      color="secondary"
      size="small"
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      Undo
    </Button>
  );

  const handleDelete = () => {
    onDelete(realItemId);
    enqueueSnackbar(
      `${item.genericItems?.edges[0]?.node?.name} is being deleted`,
      {
        action,
        autoHideDuration: 3000,
        onClose(_, reason) {
          if (reason === 'timeout') {
            // do nothing
          }
        },
      },
    );
  };

  const handleChangeCondition = async (condition: string) => {
    try {
      await updateCondition({
        variables: { databaseId: parseInt(realItemId), condition },
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: 'dark',
      });
    }
  };

  const handleDetailCard = () => {
    showDetail(true);
  };

  const medias = useMemo(() => dataMedias?.media || [], [dataMedias]);
  const maxSteps = dataMedias ? dataMedias?.media?.length! : 0;
  const isStockMedia = medias.length === 0;
  const merchantsConditionMultiplier =
    useMemo(
      () =>
        multipliersData?.merchantsConditionMultiplier?.filter(
          (multiitem: any) => multiitem.conditionId === item?.condition,
        ),
      [multipliersData, item],
    ) || [];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const transformRef = useRef(null);
  const transformRef0 = useRef(null);
  const transformRef1 = useRef(null);

  const resetCard = () => {
    // @ts-ignore
    transformRef.current?.resetTransform();
    // @ts-ignore
    transformRef0.current?.resetTransform();
    // @ts-ignore
    transformRef1.current?.resetTransform();
  };

  return (
    <>
      <Card sx={{ borderRadius: 4 }}>
        <Card sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
          <Box
            position="relative"
            sx={{
              overflow: 'hidden',
              aspectRatio: '0.725',
              border: 6,
              borderRadius: 4,
              borderColor: 'purple',
              '&:hover .MuiSpeedDial-root , &:hover .MuiMobileStepper-root': {
                visibility: 'visible',
              },
            }}
          >
            {isStockMedia ? (
              <TransformWrapper
                ref={transformRef}
                alignmentAnimation={{
                  disabled: true,
                }}
                limitToBounds={true}
                panning={{ velocityDisabled: true }}
                initialScale={1}
                minScale={0.5}
                disabled={!zoom}
              >
                {({ resetTransform }) => (
                  <>
                    <TransformComponent
                      wrapperStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <Box position="relative">
                        <CardMedia
                          component="img"
                          image={
                            item.genericItems?.edges[0]?.node?.imageUriLarge ||
                            ''
                          }
                          sx={{
                            objectFit: 'cover',
                            borderRadius: 5,
                          }}
                        />
                        <CardMedia
                          component="div"
                          sx={{
                            textAlign: 'center',
                            overflow: 'hidden',
                            position: 'absolute',
                            bottom: 0,
                            right: -10,
                            width: '150px',
                            height: '150px',
                            zIndex: 1,
                          }}
                        >
                          <Box
                            component="span"
                            position="absolute"
                            sx={{
                              left: '-15px',
                              bottom: '40px',
                              display: 'block',
                              width: '200px',
                              padding: '8px 0',
                              bgcolor: 'yellow',
                              textAlign: 'center',
                              transform: 'rotate(-45deg)',
                              fontWeight: 'bolder',
                              fontSize: '18px',
                              color: 'black',
                              boxShadow: '0 5px 10px rgba(0,0,0,.1)',
                            }}
                          >
                            STOCK IMAGE
                          </Box>
                        </CardMedia>
                      </Box>
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            ) : (
              <>
                <SwipeableViews
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                >
                  {medias.map((media, index) => (
                    <TransformWrapper
                      key={index}
                      ref={transformRef0}
                      alignmentAnimation={{
                        disabled: true,
                      }}
                      limitToBounds={true}
                      panning={{ velocityDisabled: true }}
                      minScale={0.5}
                      disabled={!zoom}
                    >
                      {({ resetTransform }) => (
                        <>
                          <TransformComponent
                            wrapperStyle={{
                              width: '100%',
                              height: '100%',
                              aspectRatio: '0.725',
                            }}
                            contentStyle={{
                              height: '100%',
                            }}
                          >
                            <CardMedia
                              component="img"
                              image={media?.mediaUrl || ''}
                              sx={{
                                objectFit: 'contain',
                              }}
                            />
                          </TransformComponent>
                        </>
                      )}
                    </TransformWrapper>
                  ))}
                  <TransformWrapper
                    ref={transformRef1}
                    alignmentAnimation={{
                      disabled: true,
                    }}
                    limitToBounds={true}
                    panning={{ velocityDisabled: true }}
                    initialScale={1}
                    minScale={0.5}
                    disabled={!zoom}
                  >
                    {({ resetTransform }) => (
                      <>
                        <TransformComponent
                          wrapperStyle={{
                            width: '100%',
                            height: '100%',
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={
                              item.genericItems?.edges[0]?.node
                                ?.imageUriLarge || ''
                            }
                            sx={{
                              borderRadius: 4,
                              aspectRatio: '0.725',
                            }}
                          />
                        </TransformComponent>
                      </>
                    )}
                  </TransformWrapper>
                </SwipeableViews>
                <MobileStepper
                  steps={maxSteps + 1}
                  position="static"
                  variant="text"
                  activeStep={activeStep}
                  nextButton={
                    <IconButton
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps}
                      sx={{ color: 'black', WebkitTextStroke: '2px black' }}
                    >
                      <KeyboardArrowRight />
                    </IconButton>
                  }
                  backButton={
                    <IconButton
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      sx={{ textShadow: '0 0 3px white', color: 'black' }}
                    >
                      <KeyboardArrowLeft />
                    </IconButton>
                  }
                  sx={{
                    visibility: 'hidden',
                    textShadow: '0 0 3px white',
                    fontSize: '20px',
                    position: 'absolute',
                    bottom: '0',
                    backgroundColor: 'transparent',
                    color: 'black',
                    width: '100%',
                  }}
                />
              </>
            )}
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{
                position: 'absolute',
                right: '10px',
                top: '0',
                visibility: 'hidden',
                minWidth: '0 !important',
                width: '16px !important',
                height: '16px !important',
                '.MuiSpeedDial-fab': {
                  width: '30px',
                  height: '30px',
                  minHeight: '30px',
                  background: 'black',
                },
              }}
              icon={
                zoom ? (
                  <PanToolIcon
                    sx={{
                      fontSize: '10px',
                      width: '20px !important',
                      height: '20px !important',
                      color: 'white',
                    }}
                  />
                ) : (
                  <ZoomInIcon
                    sx={{
                      fontSize: '10px',
                      width: '20px !important',
                      height: '20px !important',
                      color: 'white',
                    }}
                  />
                )
              }
              direction="down"
              onClick={() => setZoom(!zoom)}
            >
              {zoom && (
                <SpeedDialAction
                  key="Reset"
                  icon={
                    <RotateLeftIcon
                      sx={{
                        fontSize: '16px',
                        width: '20px !important',
                        height: '20px !important',
                        color: 'white',
                      }}
                    />
                  }
                  tooltipTitle="Reset View"
                  onClick={resetCard}
                />
              )}
            </SpeedDial>
          </Box>
        </Card>
        <CardHeader
          title={
            <>
              {item.genericItems?.edges[0]?.node?.name} &nbsp;
              {`( ${item.genericItems?.edges[0]?.node?.setName} )`}
              <br />
              {'Est. Value: ' + formatter.format(item.fmv || 0)}
            </>
          }
          titleTypographyProps={{ variant: 'body1', noWrap: true }}
          sx={{ '& .MuiCardHeader-content': { minWidth: 0 } }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography>Condition</Typography>
          <Typography>Multiplier</Typography>
        </Box>
        <CardActions disableSpacing>
          <SelectCondition
            value={item?.condition}
            onChange={handleChangeCondition}
            disabled={isUpdatingCondition}
          />
          {isUpdatingCondition && <CircularProgress />}
          <Typography align="center" sx={{ width: '70%' }}>
            {merchantsConditionMultiplier?.[0]?.multiplier}
          </Typography>
        </CardActions>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <IconButton onClick={handleDetailCard}>
              <CloudUploadIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                duplicateCard(
                  item.itemId as number,
                  item.itemListId as number,
                  item.condition as string,
                )
              }
            >
              <AddIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                confirmDialog(
                  handleDelete,
                  'Are you gonna delete this item?',
                  item.genericItems?.edges[0]?.node?.name || '',
                )
              }
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Typography>
            More details
            <Link to={`/assets/${realItemId}`}>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </Link>
          </Typography>
        </CardActions>
      </Card>
      <ItemDetailModal
        open={isOpenDetail}
        onClose={() => showDetail(false)}
        item={item}
      />
      {open && <FullCardMagnify item={item} closeModal={setOpen} />}
    </>
  );
}

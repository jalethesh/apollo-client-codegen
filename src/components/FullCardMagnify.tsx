import React, { useMemo, useState, useRef } from 'react';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Typography, MobileStepper } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import CloseIcon from '@mui/icons-material/Close';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import SwipeableViews from 'react-swipeable-views';
import { RealItemObject, useGetMediaQuery } from '../types/graphql';

interface MedidCardProps {
  item: RealItemObject;
  closeModal: (open: boolean) => void;
}

export default function FullCardMagnify(props: MedidCardProps) {
  const { item, closeModal } = props;
  const [activeStep, setActiveStep] = useState(0);

  const { data: dataMedias } = useGetMediaQuery({
    variables: { realItemId: parseInt(item.databaseId!) },
  });

  const medias = useMemo(() => dataMedias?.media || [], [dataMedias]);
  const maxSteps = dataMedias ? dataMedias?.media?.length! : 0;
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

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 10000,
        cursor: 'pointer',
        backgroundColor: 'rgba(0,0,0,.5)',
      }}
    >
      <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
        {medias.map((media, index) => (
          <TransformWrapper
            key={index}
            ref={transformRef0}
            alignmentAnimation={{
              disabled: true,
            }}
            limitToBounds={true}
            panning={{ velocityDisabled: true }}
            initialScale={1}
            minScale={0.5}
          >
            {({ resetTransform }) => (
              <>
                <TransformComponent
                  wrapperStyle={{
                    width: '100vw',
                    height: '100vh',
                  }}
                  contentStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100vw',
                    height: '100vh',
                  }}
                >
                  <ClickAwayListener onClickAway={() => closeModal(false)}>
                    <Box
                      sx={{
                        height: { xs: 'auto', md: '100%' },
                        width: { xs: '100%', md: 'auto' },
                      }}
                    >
                      <Box
                        component="img"
                        src={media?.mediaUrl || ''}
                        sx={{
                          objectFit: 'contain',
                          height: { xs: 'auto', md: '100%' },
                          width: { xs: '100%', md: 'auto' },
                        }}
                      />
                    </Box>
                  </ClickAwayListener>
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
          doubleClick={{
            disabled: true,
          }}
        >
          {({ resetTransform }) => (
            <>
              <TransformComponent
                wrapperStyle={{
                  width: '100vw',
                  height: '100vh',
                }}
                contentStyle={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100vw',
                  height: '100vh',
                }}
              >
                <ClickAwayListener onClickAway={() => closeModal(false)}>
                  <Box
                    sx={{
                      height: { xs: 'auto', md: '100%' },
                      width: { xs: '100%', md: 'auto' },
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        item.genericItems?.edges[0]?.node?.imageUriLarge || ''
                      }
                      sx={{
                        borderRadius: 8,
                        height: { xs: 'auto', md: '100%' },
                        width: { xs: '100%', md: 'auto' },
                      }}
                      alt="Stock"
                    />
                  </Box>
                </ClickAwayListener>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </SwipeableViews>
      <IconButton
        sx={{ position: 'absolute', top: 0, right: 0 }}
        onClick={() => closeModal(false)}
      >
        <CloseIcon />
      </IconButton>
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
          >
            <KeyboardArrowRight />
          </IconButton>
        }
        backButton={
          <IconButton
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
          </IconButton>
        }
        sx={{
          textShadow: '0 0 3px white',
          fontSize: '20px',
          position: 'absolute',
          bottom: '0',
          backgroundColor: 'transparent',
          color: 'black',
          width: '100%',
        }}
      />
    </Box>
  );
}

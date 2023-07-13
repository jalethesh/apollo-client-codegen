import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Grid } from '@mui/material';
import { useGenericItemsQuery } from '../../types/graphql';
import CardSkeleton from '../../components/Loading/SkeletonLoading/CardSkeleton';
import CardModal from '../../components/CardImgModal';

type Props = {
  ids: number[];
  selectedMatchId: number | undefined;
  setSelectedMatchId: (id: number) => void;
  openDialogueConfirmation: (bool: boolean, num: number) => void;
  sendingFeedback: boolean;
};

export default function PredictedMatchList ({
  ids,
  selectedMatchId,
  setSelectedMatchId,
  openDialogueConfirmation,
  sendingFeedback,
}: Props) {
  const [cardShow, setCardShow] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const { data, loading, error } = useGenericItemsQuery({
    variables: { databaseId: ids ? ids : [] },
  });

  const predictedMatchItems = data?.genericItems?.map((item, idx) => ({
    ...item,
    databaseId: ids[idx],
  }));

  //! Current query doesnt include databse ID, need to append one
  useEffect(() => {
    if (predictedMatchItems) {
      const selectedItem = predictedMatchItems?.find(
        (item) => item?.databaseId === selectedMatchId,
      );
      if (selectedItem?.imageUriNormal) {
        setSelectedImageUrl(selectedItem?.imageUriNormal);
      }
    }
  }, [predictedMatchItems, selectedMatchId]);

  return (
    <Grid container spacing={2}>
      {loading ? (
        <>
          <Grid item xs={12} md={4} lg={3} sm={6}>
            <CardSkeleton />
          </Grid>
          <Grid item xs={12} md={4} lg={3} sm={6}>
            <CardSkeleton />
          </Grid>
          <Grid item xs={12} md={4} lg={3} sm={6}>
            <CardSkeleton />
          </Grid>
        </>
      ) : (
        predictedMatchItems &&
        predictedMatchItems.map((item) => (
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sm={6}
            key={item?.id as string}
            onClick={() => {
              setSelectedMatchId(item?.databaseId);
            }}
          >
            <Box
              sx={{ position: 'relative' }}
              onClick={() => setCardShow(true)}
            >
              <Box
                component="img"
                style={{ width: '100%' }}
                src={item?.imageUriNormal as string}
                alt={'waiting'}
                sx={{
                  maxWidth: '100%',
                  border: 6,
                  borderRadius: 4,
                  borderColor:
                    selectedMatchId === item?.databaseId ? 'purple' : 'gray',
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>{`#${item?.databaseId}: ${item?.name}`}</Typography>
              <Button
                disabled={sendingFeedback}
                color="success"
                variant="outlined"
                onClick={() =>
                  openDialogueConfirmation(true, item?.databaseId as number)
                }
              >
                Set as Match
              </Button>
            </Box>
          </Grid>
        ))
      )}
      <CardModal
        imageUrl={selectedImageUrl}
        handleModal={(open: boolean) => setCardShow(open)}
        cardShow={cardShow}
      />
    </Grid>
  );
};


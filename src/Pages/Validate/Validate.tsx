import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { Box, Typography, Button, Stack, Grid, Divider } from '@mui/material';
import {
  EbayListingObject,
  useCreateUpdateListingFeedbackMutation,
  useGetEbayListingQuery,
} from 'types/graphql';
import { useHistory } from 'react-router-dom';
import useGuessRedirect from 'helpers/Hooks/useGuessRedirect';
import { ToastContainer, toast } from 'react-toastify';
import ToMatchCard from './ToMatchCard';
import PredictedMatchList from './PredictedMatchList';
import CardSkeleton from 'components/Loading/SkeletonLoading/CardSkeleton';
import { confirmDialog } from 'components/ConfirmationDialog';

export const responsiveCardWidth = { md: '350px', xs: '100%', sm: '350px' };

export default function Validate() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  useGuessRedirect(); // TODO: Get user data to pass in the post feedback
  const {
    data: toMatchData,
    loading: toMatchLoading,
    error: toMatchError,
  } = useGetEbayListingQuery({
    variables: { databaseId: parseInt(id) },
  });
  const [createUpdateListing] = useCreateUpdateListingFeedbackMutation();
  const [toMatchItem, setToMatchItem] = useState<EbayListingObject | null>(
    null,
  );

  const [userComment, setUserComment] = useState<string>('');
  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>(
    undefined,
  );
  const [predictedMatchIdList, setPredictedMatchIdList] = useState<number[]>(
    [],
  );
  const [isCorrect, setIsCorrect] = useState(false);
  const [sendingFeedback, setSendingFeedback] = useState(false);

  // When first load
  useEffect(() => {
    if (toMatchData?.ebayListing?.length === 1) {
      const [_toMatchItem] = toMatchData.ebayListing;
      setToMatchItem(_toMatchItem as EbayListingObject);
      if (_toMatchItem) {
        const { predictedGenericIdList } = _toMatchItem;
        if (predictedGenericIdList) {
          setPredictedMatchIdList(
            predictedGenericIdList.split(',').map((id) => parseInt(id)),
          );
        }
      }
    }
  }, [toMatchData]);

  // Triggers on Submit, confirmation dialogue's onSubmit will hoist the state and causing it to fetch the previous value
  const postData = useCallback(
    async (
      ebaylistingId: number,
      isCorrect: boolean,
      userComment?: string,
      userSelectedGenericId?: number,
    ) => {
      try {
        await toast.promise(
          createUpdateListing({
            variables: {
              ebaylistingId,
              userSelectedGenericId,
              userComment,
              isCorrect,
            },
          }),
          {
            pending: 'Submitting your validation',
            success: 'Validation Sent!',
            error: 'Error on sending validation',
          },
          { theme: 'dark' },
        );
      } catch (error) {
        toast.error(`${error}`, {
          theme: 'dark',
        });
      }
    },
    [createUpdateListing],
  );

  const openDialogueConfirmation = useCallback(
    (matchFound: boolean, databaseId?: number) => {
      confirmDialog(
        () => {
          setSendingFeedback(true);
          setIsCorrect(matchFound);
        },
        matchFound
          ? `Item ${databaseId} Matched?`
          : 'No Item in the List Matched?',
        undefined,
        {
          value: userComment,
          setComment: setUserComment,
          label: 'Any Comments?',
        },
      );
    },
    [userComment],
  );

  useEffect(() => {
    if (sendingFeedback && toMatchItem) {
      postData(
        parseInt(toMatchItem?.databaseId),
        isCorrect,
        userComment,
        selectedMatchId,
      );
      setSendingFeedback(false);
      setUserComment('');
    }
  }, [sendingFeedback]);

  return (
    <Stack sx={{ position: 'relative', rowGap: 1 }}>
      <Typography
        variant="h5"
        sx={{
          position: { xs: 'initial', md: 'absolute' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Validate This Card!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {toMatchLoading ? (
          <Box sx={{ width: responsiveCardWidth, textAlign: 'center' }}>
            <p>Loading...</p>
            <CardSkeleton />
          </Box>
        ) : (
          toMatchItem && (
            <ToMatchCard
              title={toMatchItem.title as string}
              url={toMatchItem.url as string}
              winningBid={toMatchItem.winningBid as number}
              listingDate={toMatchItem.listingDate as string}
              numberOfBids={toMatchItem.numberOfBids as number}
              imageUrls={
                [
                  toMatchItem.photoUrl1,
                  toMatchItem.photoUrl2,
                  toMatchItem.photoUrl3,
                  toMatchItem.photoUrl4,
                  toMatchItem.photoUrl5,
                ] as string[]
              }
            />
          )
        )}
      </Box>

      <Divider sx={{ margin: '10px 0' }} />
      <Box>
        <Typography
          variant="h5"
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          Potential Match
        </Typography>
        <PredictedMatchList
          ids={predictedMatchIdList}
          selectedMatchId={selectedMatchId}
          setSelectedMatchId={setSelectedMatchId}
          openDialogueConfirmation={openDialogueConfirmation}
          sendingFeedback={sendingFeedback}
        />
      </Box>
      <Divider sx={{ margin: '10px 0' }} />
      <Button
        color="error"
        variant="outlined"
        disabled={sendingFeedback}
        sx={{ width: { xs: '100%', sm: '300px' }, alignSelf: 'center' }}
        onClick={() => {
          openDialogueConfirmation(false, undefined);
        }}
      >
        No Match
      </Button>
      <ToastContainer />
    </Stack>
  );
}

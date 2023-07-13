import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';

import { Stack, Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Typography, Divider, Button } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';

import SelectCondition from '../../components/SelectCondition';
import SelectUserList from '../../components/SelectUserList';
import CardModal from '../../components/CardImgModal';

import {
  RealItemObject,
  useUpdateRealItemMutation,
  useGetUserQuery,
  useCollectionDataQuery,
} from '../../types/graphql';
import {
  GET_REAL_ITEM,
  GET_COLLECTION_DATA,
  GET_TRANSACTIONS,
  GET_TRANSACTION_ITEMS,
} from '../../graphql/queries';

interface RealItemInfoProps {
  realItemdata: RealItemObject;
}

export default function RealItemInfo(props: RealItemInfoProps) {
  const [cardShow, setCardShow] = useState(false);
  const history = useHistory();
  const location = useLocation<any>();
  const {
    data: dataUserList,
    loading: loadingUserList,
    error: userlisterror,
  } = useCollectionDataQuery();

  const { realItemdata } = props;
  const userlist = dataUserList?.itemCollections?.[0]?.lists;

  const [updateCondition, { loading: isUpdatingCondition }] =
    useUpdateRealItemMutation({
      refetchQueries: () =>
        location.state
          ? [
              {
                query: GET_REAL_ITEM,
                variables: { realItemId: parseInt(realItemdata?.databaseId) },
              },
              {
                query: GET_TRANSACTIONS,
              },

              {
                query: GET_TRANSACTION_ITEMS,
                variables: {
                  transactionId: parseInt(location.state.transactionId),
                },
              },
            ]
          : [
              {
                query: GET_REAL_ITEM,
                variables: { realItemId: parseInt(realItemdata?.databaseId) },
              },
            ],
    });

  const {
    data: userData,
    loading: userloading,
    error,
  } = useGetUserQuery({
    variables: { userId: realItemdata?.owner },
  });

  const handleChangeCondition = async (condition: string) => {
    try {
      await updateCondition({
        variables: {
          databaseId: parseInt(realItemdata?.databaseId),
          condition,
        },
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: 'dark',
      });
    }
  };

  const handleModal = (open: boolean) => {
    setCardShow(open);
  };

  const handleGoToList = () => {
    console.log(realItemdata);
    history.push('/lists/' + String(realItemdata?.itemListId));
  };

  return (
    <Stack spacing={2}>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: '0px !important',
          flexDirection: { xs: 'row', sm: 'row', lg: 'row-reverse' },
          alignItems: 'center',
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isUpdatingCondition && <CircularProgress />}
          <SelectCondition
            value={realItemdata?.condition}
            onChange={handleChangeCondition}
            disabled={isUpdatingCondition}
          />

          <Button onClick={handleGoToList}> View collection</Button>
          {/* left for the future
          <Card
            variant="outlined"
            sx={{
              width: { lg: "80%", md: "85%", sm: "90%", xs: "95%" },
              marginTop: 3
            }}
          >
            <CardHeader
              avatar={<ImportContactsIcon fontSize="large" />}
              title="Card Information"
              sx={{ paddingLeft: 3 }}
            />
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                <Typography sx={{ color: "text.secondary" }}>Power</Typography>
                <Typography sx={{ color: "text.secondary" }}>Placeholder</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                <Typography sx={{ color: "text.secondary" }}>Stats</Typography>
                <Typography sx={{ color: "text.secondary" }}>Placeholder</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                <Typography sx={{ color: "text.secondary" }}>Color</Typography>
                <Typography sx={{ color: "text.secondary" }}>Placeholder</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                <Typography sx={{ color: "text.secondary" }}>Ability</Typography>
                <Typography sx={{ color: "text.secondary" }}>Placeholder</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                <Typography sx={{ color: "text.secondary" }}>Owner</Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {userloading ? "loading..." : userData?.user?.username}
                </Typography>
              </Box>
            </CardContent>
          </Card> */}
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Typography align="center" variant="h4">
            {realItemdata?.genericItems?.edges?.[0]?.node?.name}
          </Typography>
          <Typography align="center" variant="h6">
            {realItemdata?.genericItems?.edges?.[0]?.node?.setName}
          </Typography>
          <Box
            sx={{
              display: { xs: 'block', sm: 'flex' },
              marginTop: 3,
              justifyContent: 'space-around',
            }}
          >
            <Box
              className={'collectible-image'}
              sx={{
                width: 350,
                height: 483,
                margin: { xs: 'auto', sm: 0 },
                borderRadius: '15px',
                border: '4px solid black',
                boxShadow: '0 0 20px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => handleModal(true)}
            >
              <img
                src={
                  realItemdata?.genericItems?.edges?.[0]?.node?.imageUriLarge ||
                  ''
                }
                width="100%"
                alt="realItem"
                height="100%"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <CardModal
        imageUrl={
          realItemdata?.genericItems?.edges?.[0]?.node?.imageUriLarge || ''
        }
        handleModal={handleModal}
        cardShow={cardShow}
      />
      <ToastContainer />
    </Stack>
  );
}

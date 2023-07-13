import React, { useState } from 'react';
import { useParams } from 'react-router';
import './index.css';
import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { ToastContainer, toast } from 'react-toastify';
import { useReactiveVar } from '@apollo/client';
import AutoCompleteCardSearch from 'components/AutoCompleteCardSearch';
import ItemListDataDisplay from './ItemListDataDisplay';
import BackHistory from '../../components/BackHistory';
import SubmitTrade from '../../components/SubmitTrade';
import { currencyFormatter } from '../../helpers';
import {
  useCreateRealItemMutation,
  useGetItemListsQuery,
  useGetUserQuery,
} from '../../types/graphql';
import { userEffectiveRoleVar } from '../../graphql';

import {
  GET_REAL_ITEMS_IN_ITEM_LIST,
  GET_ITEM_LISTS,
} from '../../graphql/queries';
import getGenericId from 'helpers/getGenericId';
import { GenericItemObject } from 'types/graphql';

const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: 'auto',
  },
}));

export default function ItemList() {
  const { databaseId } = useParams<{ databaseId: string }>();
  const listId = parseInt(databaseId);
  const [page, setPage] = useState<number>(0);
  const [paginationLimit, setPaginationLimitValue] = useState<number>(24);
  const userEffectiveRole = useReactiveVar(userEffectiveRoleVar);
  const {
    data: itemListData,
    loading: itemListLoading,
    error: itemListError,
  } = useGetItemListsQuery({
    variables: { itemListId: listId },
  });

  const { data: listCreator, loading: creatorLoading } = useGetUserQuery({
    variables: { userId: itemListData?.itemLists?.[0]?.userId },
  });

  const [createRealItem] = useCreateRealItemMutation({
    refetchQueries: [
      {
        query: GET_REAL_ITEMS_IN_ITEM_LIST,
        variables: { itemListId: listId, page: page, perPage: paginationLimit },
      },
      {
        query: GET_ITEM_LISTS, // this query is filtered for the user by default
      },
    ],
  });

  const handleClickCard = async (genericItem: GenericItemObject) => {
    try {
      const itemId = getGenericId(genericItem.id);
      await toast.promise(
        createRealItem({
          variables: {
            itemId,
            itemListId: listId,
          },
        }),
        {
          pending: 'Pending',
          success: 'Success',
        },
        {
          theme: 'dark',
        },
      );
    } catch (error) {
      toast.error(`${error}`, {
        theme: 'dark',
      });
    }
  };

  const setPaginationLimit = (paginationLimit: number) => {
    setPage(0);
    setPaginationLimitValue(paginationLimit);
  };

  return (
    <Stack sx={{ position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-end' },
          justifyContent: { xs: 'center', md: 'space-between' },
          marginRight: { xs: '0', md: '-14px' },
          marginLeft: { xs: '0', md: '0' },
          marginTop: { xs: '0', md: '-10px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'center', md: 'flex-end' },
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            width: { xs: '100%', md: '400px', xl: '600px' },
            marginLeft: { xs: '0', md: '0' },
            flexGrow: 1,
          }}
        >
          {!(userEffectiveRole === 'nologin') && (
            <AutoCompleteCardSearch
              listId={listId}
              onSelect={handleClickCard}
              placeholder={'Add card to collection . . .'}
            />
          )}
        </Box>
        <Box
          sx={{
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
            borderBottomLeftRadius: '5px',
            width: { xs: '100%', md: '600px' },
            marginTop: { xs: '0', md: '0' },
            borderColor: 'rgba(144, 202, 249, 0.5)',
            borderStyle: 'ridge',
            padding: '2px 0',
          }}
        >
          <Box
            sx={{
              color: (theme) => theme.palette.text.secondary,
              display: 'flex',
              justifyContent: { xs: 'center', md: 'space-between' },
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'flex-end' },
              padding: '4px 10px',
              width: '100%',
            }}
          >
            <CustomBox>
              <Typography
                color="primary"
                sx={{ width: { xs: '50%', md: 'auto' } }}
              >
                Name &nbsp;
              </Typography>
              <Typography>
                {itemListLoading
                  ? 'loading...'
                  : itemListData?.itemLists?.[0]?.name}
              </Typography>
            </CustomBox>
            <CustomBox>
              <Typography
                color="primary"
                sx={{ width: { xs: '50%', md: 'auto' } }}
              >
                Creator &nbsp;
              </Typography>
              <Typography>
                {' '}
                {creatorLoading
                  ? 'loading...'
                  : `${listCreator?.user?.username}`}
              </Typography>
            </CustomBox>
            <CustomBox>
              <Typography
                color="primary"
                sx={{ width: { xs: '50%', md: 'auto' } }}
              >
                Total &nbsp;
              </Typography>
              <Typography>
                {' '}
                {itemListLoading
                  ? 'loading...'
                  : currencyFormatter({
                      value: itemListData?.itemLists?.[0]?.value as number,
                    })}
              </Typography>
            </CustomBox>
            <CustomBox>
              <Typography
                color="primary"
                sx={{ width: { xs: '50%', md: 'auto' } }}
              >
                Count &nbsp;{' '}
              </Typography>
              <Typography>
                {' '}
                {itemListLoading
                  ? 'loading...'
                  : itemListData?.itemLists?.[0]?.count}
              </Typography>
            </CustomBox>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: { sx: '5px', md: '-30px' },
            marginBottom: { xs: '5px', md: '0px' },
            width: { xs: '100%', md: '320px' },
          }}
        >
          {itemListLoading ? (
            <Typography align="center">Loading...</Typography>
          ) : (
            <>
              <SubmitTrade
                listId={listId}
                itemListNumber={itemListData?.itemLists?.[0]?.count as number}
              />
            </>
          )}
        </Box>
      </Box>
      <Box sx={{ marginTop: '6px', overflow: 'visible' }}>
        <ItemListDataDisplay
          itemListId={listId}
          page={page}
          paginationLimit={paginationLimit}
          setPage={setPage}
          setPaginationLimit={setPaginationLimit}
        />
      </Box>
      <ToastContainer />
    </Stack>
  );
}

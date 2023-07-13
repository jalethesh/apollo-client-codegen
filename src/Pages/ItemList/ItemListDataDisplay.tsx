import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CircularProgress from '@mui/material/CircularProgress';
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded';
import throttle from 'lodash/throttle';

import MediaCard from './MediaCard';
import CustomPagination from '../../components/CustomPagination';
import CardSkeleton from '../../components/Loading/SkeletonLoading/CardSkeleton';
import TableSkeleton from '../../components/Loading/SkeletonLoading/TableSkeleton';
import RealItemTable from './RealItemTable';
import SearchItem from './SearchItem';
import SortingItem from './SortingItem';
import { toast } from 'react-toastify';

import {
  useDeleteRealItemMutation,
  useGetRealItemsByItemListQuery,
  useGetRealItemsByItemListLazyQuery,
  useCreateRealItemMutation,
} from '../../types/graphql';
import {
  GET_ITEM_LISTS,
  GET_REAL_ITEMS_IN_ITEM_LIST,
} from '../../graphql/queries';

enum ViewMode {
  List,
  Grid,
}

interface ItemListDataDisplayProps {
  itemListId: number;
  page: number;
  setPage: (value: number) => void;
  paginationLimit: number;
  setPaginationLimit: (value: number) => void;
}

export default function ItemListDataDisplay(props: ItemListDataDisplayProps) {
  const { itemListId, page, setPage, paginationLimit, setPaginationLimit } =
    props;
  const [viewMode, setViewMode] = useState(ViewMode.List);
  const [collectionItemCount, setCollectionItemCount] = useState(6);
  const [sortingKey, setSortingKey] = useState<string | undefined>('');
  const [reverse, setReverse] = useState(false);
  const [partName, setPartName] = useState<string | undefined>('');

  const [
    getRealItems,
    { data: itemsData, loading: loadingItems, error: errorItems },
  ] = useGetRealItemsByItemListLazyQuery({
    variables: {
      itemListId: itemListId,
      page: page,
      perPage: paginationLimit,
    },
  });

  const realItems = useMemo(
    () =>
      itemsData?.itemLists?.[0]?.realItems?.edges.map((item: any) => item.node),
    [itemsData],
  );

  const [deleteRealItem] = useDeleteRealItemMutation({
    refetchQueries: [
      {
        query: GET_REAL_ITEMS_IN_ITEM_LIST,
        variables: {
          itemListId: itemListId,
          page: page,
          perPage: paginationLimit,
        },
      },
      {
        query: GET_ITEM_LISTS, // this query is filtered for the user by default
      },
    ],
  });

  const handleChangeViewMode = useCallback((_: any, value: ViewMode) => {
    setViewMode(value);
  }, []);

  const handleDeleteRealItem = useCallback(
    async (realItemId: string) => {
      try {
        await deleteRealItem({
          variables: { databaseId: parseInt(realItemId) },
        });
      } catch (error) {
        toast.error(`${error}`, {
          theme: 'dark',
        });
      }
    },
    [deleteRealItem],
  );

  const [createRealItem] = useCreateRealItemMutation({
    refetchQueries: [
      {
        query: GET_REAL_ITEMS_IN_ITEM_LIST,
        variables: {
          itemListId: itemListId,
          page: page,
          perPage: paginationLimit,
        },
      },
      {
        query: GET_ITEM_LISTS, // this query is filtered for the user by default
      },
    ],
  });

  const duplicateCard = useCallback(
    async (genericItemId: number, itemistId: number, condition: string) => {
      try {
        await toast.promise(
          createRealItem({
            variables: {
              itemId: genericItemId,
              itemListId: itemistId,
              condition: condition,
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
    },
    [createRealItem],
  );

  useMemo(() => {
    if (itemsData?.itemLists?.[0]?.count) {
      setCollectionItemCount(itemsData?.itemLists?.[0]?.count || 6);
    }
  }, [itemsData]);

  const gridView = useMemo(
    () => (
      <Grid
        container
        spacing={2}
        columns={{ xs: 1, sm: 3, md: 4, lg: 4, xl: 6 }}
      >
        {loadingItems && (
          <>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} key={'grid-item-1'}>
              <CardSkeleton />
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} key={'grid-item-2'}>
              <CardSkeleton />
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} key={'grid-item-3'}>
              <CardSkeleton />
            </Grid>
          </>
        )}
        {realItems?.map((item: any) => (
          <Grid key={item?.databaseId} item xs={1} sm={1} md={1} lg={1} xl={1}>
            <MediaCard
              item={item}
              onDelete={handleDeleteRealItem}
              duplicateCard={duplicateCard}
              page={page}
              perPage={paginationLimit}
            />
          </Grid>
        ))}
      </Grid>
    ),
    [
      handleDeleteRealItem,
      realItems,
      paginationLimit,
      page,
      loadingItems,
      duplicateCard,
    ],
  );

  const listView = useMemo(
    () => (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', overflow: 'visible' }}
      >
        {loadingItems ? (
          <TableSkeleton />
        ) : (
          <RealItemTable
            collectionDatabaseId={0}
            items={realItems || []}
            onDelete={handleDeleteRealItem}
            listId={itemListId}
            page={page}
            perPage={paginationLimit}
          />
        )}
      </Box>
    ),
    [
      realItems,
      handleDeleteRealItem,
      itemListId,
      page,
      paginationLimit,
      loadingItems,
    ],
  );

  const handleSearch = useMemo(
    () =>
      throttle((partialName: string | undefined) => {
        setPartName(partialName);
        try {
          getRealItems({
            variables: {
              partialName: partialName,
              itemListId: itemListId,
              page: page,
              perPage: paginationLimit,
              sortKey: sortingKey,
              sortReverse: reverse,
            },
          });
        } catch (error) {
          toast.error(`${error}`, {
            theme: 'dark',
          });
        }
      }, 200),
    [getRealItems, itemListId, page, paginationLimit, sortingKey, reverse],
  );

  const handleSorting = useMemo(
    () =>
      throttle((sortKey: string | undefined, sortReverse: boolean) => {
        setSortingKey(sortKey);
        setReverse(sortReverse);
        try {
          getRealItems({
            variables: {
              itemListId: itemListId,
              page: page,
              perPage: paginationLimit,
              sortKey: sortKey,
              sortReverse: sortReverse,
              partialName: partName,
            },
          });
        } catch (error) {
          toast.error(`${error}`, {
            theme: 'dark',
          });
        }
      }, 200),
    [getRealItems, itemListId, page, paginationLimit, partName],
  );

  useEffect(() => {
    getRealItems();
  }, [getRealItems]);

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'flex-end' },
          }}
        >
          <SearchItem handleSearch={handleSearch} />
          <SortingItem handleSorting={handleSorting} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <CustomPagination
            page={page}
            perPage={paginationLimit}
            count={collectionItemCount}
            setHandlePage={setPage}
            setHandlePerPage={setPaginationLimit}
          />
          <ToggleButtonGroup
            exclusive
            value={viewMode}
            onChange={handleChangeViewMode}
            aria-label="view mode"
          >
            <ToggleButton value={ViewMode.Grid} aria-label="grid view">
              <GridViewRoundedIcon />
            </ToggleButton>
            <ToggleButton value={ViewMode.List} aria-label="list view">
              <ViewStreamRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={{ overflow: 'visible' }}>
        {errorItems && <>Error</>}
        {viewMode === ViewMode.Grid ? gridView : listView}
      </Box>
    </Stack>
  );
}

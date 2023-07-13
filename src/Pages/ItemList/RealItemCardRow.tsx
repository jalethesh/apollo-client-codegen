import React, { useMemo, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { currencyFormatter } from '../../helpers';
import {
  Avatar,
  IconButton,
  ListItemText,
  TableCell,
  TableRow,
  Button,
  Typography,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ItemDetailModal from '../../components/CollectionComponent/ItemDetailModal';
import ItemForSale from './ItemForSale';
import SelectCondition from '../../components/SelectCondition';
import { confirmDialog } from '../../components/ConfirmationDialog';
import Calculation from '../../components/Calculation';
import HoverImage from '../../components/HoverImage';

import {
  RealItemObject,
  useUpdateRealItemMutation,
  useUpdateRealItemStatusMutation,
  useGetMultiplierQuery,
} from '../../types/graphql';

import {
  GET_ITEM_LISTS,
  GET_REAL_ITEMS_IN_ITEM_LIST,
} from '../../graphql/queries';

interface RealItemCardProps {
  data: RealItemObject;
  onDelete: (databaseId: string) => void;
  collectionDatabaseId: number | undefined;
  page: number;
  perPage: number;
  listId: number;
}

interface StatusProps {
  [status: string]: string;
}

const RealItemStatus: StatusProps = {
  NEW: 'TRADE_ARRIVING',
  TRADE_ARRIVING: 'ARRIVED',
  ARRIVED: 'PRE_SCAN',
  PRE_SCAN: 'TO_SCAN',
  TO_SCAN: 'DRAFT',
  DRAFT: 'PUSH_LIVE',
  PUSH_LIVE: 'PUBLISH',
};

export default function RealItemCardRow(props: RealItemCardProps) {
  const { data, onDelete, page, perPage, listId } = props;

  const realItemId = data.databaseId;
  const [cell, setCell] = useState(false);
  const [isOpenDetailModal, showDetailModal] = useState(false);
  const [isOpenSaleModal, showOpenSaleModal] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [updateItem, { loading: isUpdatingItem }] = useUpdateRealItemMutation({
    refetchQueries: [
      {
        query: GET_REAL_ITEMS_IN_ITEM_LIST,
        variables: { itemListId: listId, page: page, perPage: perPage },
      },
      {
        query: GET_ITEM_LISTS,
      },
    ],
  });

  const [updateStatus, { loading: isUpdatingStatus }] =
    useUpdateRealItemStatusMutation({
      refetchQueries: [
        {
          query: GET_REAL_ITEMS_IN_ITEM_LIST,
          variables: { itemListId: listId, page: page, perPage: perPage },
        },
        {
          query: GET_ITEM_LISTS,
        },
      ],
    });

  const {
    data: multipliersData,
    loading: multipliersLoading,
    error: multipliersError,
  } = useGetMultiplierQuery();
  const dataOffers = useMemo(
    () => data?.genericItems?.edges?.[0]?.node,
    [data],
  );

  const merchantsConditionMultiplier =
    useMemo(
      () =>
        multipliersData?.merchantsConditionMultiplier?.filter(
          (multiitem) => multiitem?.conditionId === data?.condition,
        ),
      [multipliersData, data],
    ) || [];
  const pmedge =
    dataOffers?.latestOffers?.edges?.[0]?.node?.latestOffersHistory?.edges.filter(
      (item) => item?.node?.merchant === 'PM' && item?.node?.amount,
    );
  const maxAmount = Math.max.apply(
    null,
    dataOffers?.latestOffers?.edges?.[0]?.node?.latestOffersHistory?.edges.map(
      (item) => item?.node?.amount || 0,
    ) || [],
  );
  const maxedge =
    dataOffers?.latestOffers?.edges?.[0]?.node?.latestOffersHistory?.edges.filter(
      (item) => maxAmount === item?.node?.amount,
    );

  const price = useMemo(() => {
    if (pmedge?.length) return pmedge[0]?.node?.amount;
    if (maxedge?.length) return maxedge[0]?.node?.amount;
    return 0;
  }, [pmedge, maxedge]);
  // left for the future
  // const merchant = useMemo(() => {
  //   if (pmedge?.length) return pmedge[0]?.node?.merchant;
  //   if (maxedge?.length) return maxedge[0]?.node?.merchant;
  //   return "No offers found";
  // }, [dataOffers?.latestOffers]);

  // const lastUpdated = useMemo(() => {
  //   if (pmedge?.length) return moment(pmedge[0]?.node?.lastUpdated).format('MMM Do YYYY, h:mm A');
  //   if (maxedge?.length) return moment(maxedge[0]?.node?.lastUpdated).format('MMM Do YYYY, h:mm A');
  //   return "No offers found";
  // }, [dataOffers?.latestOffers]);

  const action = () => (
    <Button
      color="secondary"
      size="small"
      onClick={() => {
        closeSnackbar();
      }}
    >
      Undo
    </Button>
  );

  const handleDelete = () => {
    onDelete(realItemId);
    enqueueSnackbar(
      `${data.genericItems?.edges[0]?.node?.name} is being deleted`,
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
      await updateItem({
        variables: { databaseId: parseInt(realItemId), condition },
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: 'dark',
      });
    }
  };

  const handleChangePrice = async (price: string) => {
    try {
      await updateItem({
        variables: {
          databaseId: parseInt(realItemId),
          forsalePrice: Number(price),
        },
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: 'dark',
      });
    }
  };

  const handleChangeStatus = async () => {
    try {
      await updateStatus({
        variables: {
          realItemId: parseInt(realItemId),
          status: RealItemStatus[data.status as string],
        },
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: 'dark',
      });
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell sx={{ cursor: 'pointer', paddingLeft: '10px' }}>
          <Box
            sx={{
              position: 'relative',
              '&:hover .hover-image': {
                visibility: 'visible',
                opacity: 1,
              },
            }}
          >
            <Link to={`/assets/${data.databaseId}`}>
              <Avatar
                variant="rounded"
                src={data.genericItems?.edges[0]?.node?.imageUriLarge!}
                sx={{ '& .MuiAvatar-img': { objectFit: 'contain' } }}
              >
                <img src="/demo.jpg" alt="fallback" />
              </Avatar>
              <HoverImage
                url={data.genericItems?.edges[0]?.node?.imageUriLarge!}
              />
            </Link>
          </Box>
          <ListItemText
            primary={data.genericItems?.edges[0]?.node?.name}
            secondary={data.genericItems?.edges[0]?.node?.setName}
            sx={{ flex: '1', display: { xs: 'block', sm: 'none' } }}
            onClick={() => setCell(!cell)}
          />
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none', marginRight: 12 } }}
          >
            {currencyFormatter({ value: data.fmv as number })}
          </Typography>
          {cell ? (
            <IconButton onClick={() => setCell(false)}>
              <ExpandLessIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => setCell(true)}>
              <ExpandMoreIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
            </IconButton>
          )}
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Name
          </Typography>
          <ListItemText
            primary={data.genericItems?.edges[0]?.node?.name}
            secondary={data.genericItems?.edges[0]?.node?.setName}
            sx={{ flex: 'none' }}
          />
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' }, width: '200px' }}
          >
            Condition
          </Typography>
          <SelectCondition
            value={data.condition}
            onChange={handleChangeCondition}
            disabled={isUpdatingItem}
          />
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Estimated Price
          </Typography>
          {currencyFormatter({ value: data.fmv as number })}
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            For Sale Price
          </Typography>
          {currencyFormatter({ value: data.forsalePrice as number })}
          <IconButton
            onClick={() => showOpenSaleModal(true)}
            disabled={isUpdatingItem}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Status
          </Typography>
          <Typography>{data.status}</Typography>
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Update
          </Typography>
          <Button
            onClick={handleChangeStatus}
            disabled={isUpdatingStatus || data.status === 'PUBLISH'}
            endIcon={<CheckIcon />}
          >
            {RealItemStatus[data.status as string]}
          </Button>
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Media
          </Typography>
          <IconButton onClick={() => showDetailModal(true)}>
            <CloudUploadIcon />
          </IconButton>
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Delete
          </Typography>
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              confirmDialog(
                handleDelete,
                'Are you gonna delete this item?',
                data.genericItems?.edges[0]?.node?.name!,
              );
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <ItemDetailModal
        open={isOpenDetailModal}
        item={data}
        onClose={() => showDetailModal(false)}
      />
      <ItemForSale
        open={isOpenSaleModal}
        value={data.forsalePrice?.toString() as string}
        handleClose={() => showOpenSaleModal(false)}
        handleUpdate={(sale: string) => handleChangePrice(sale)}
      />
    </>
  );
}

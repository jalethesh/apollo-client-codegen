import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Typography, TableRow, TableCell, Avatar, Box } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

import PermMediaIcon from '@mui/icons-material/PermMedia';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';

import ItemDetailModal from '../../components/CollectionComponent/ItemDetailModal';
import SelectCondition from '../../components/SelectCondition';
import HoverImage from '../../components/HoverImage';
import { confirmDialog } from '../../components/ConfirmationDialog';
import getGenericId from 'helpers/getGenericId';
import { GenericItemObject } from 'types/graphql';
import { currencyFormatter } from '../../helpers';

import {
  RealItemObject,
  useGetMultiplierQuery,
  useUpdateRealItemMutation,
  useDeleteTransactionItemMutation,
  useGetMediaQuery,
} from '../../types/graphql';
import { GET_TRANSACTIONS, GET_TRANSACTION_ITEMS } from '../../graphql/queries';
import ChangeCards from './ChangeCards';

interface TradeItemCardProps {
  realItem: RealItemObject;
  tradeItem: any;
}
export default function TradeItemCard(props: TradeItemCardProps) {
  const { realItem, tradeItem } = props;

  const [cell, setCell] = useState(false);
  const [isOpenDetailModal, showDetailModal] = useState(false);
  const { databaseId } = useParams<{ databaseId: string }>();

  const {
    data: dataMulti,
    loading: loadingMulti,
    error: errorMulti,
  } = useGetMultiplierQuery();
  const multiplier = dataMulti?.merchantsConditionMultiplier?.filter(
    (item) => item?.conditionId === realItem?.condition,
  )[0]?.multiplier;

  const [updateItem, { loading: isUpdatingItem }] = useUpdateRealItemMutation({
    refetchQueries: [
      {
        query: GET_TRANSACTIONS,
      },
      {
        query: GET_TRANSACTION_ITEMS,
        variables: { transactionId: parseInt(databaseId) },
      },
    ],
  });

  const handleChangeCondition = async (condition: string) => {
    try {
      await updateItem({
        variables: {
          databaseId: parseInt(realItem?.databaseId),
          condition: condition,
        },
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: 'dark',
      });
    }
  };

  const handleChangeItemId = async (itemId: number) => {
    try {
      await updateItem({
        variables: {
          databaseId: parseInt(realItem?.databaseId),
          itemId: itemId,
        },
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: 'dark',
      });
    }
  };

  const [deleteTransactionItem] = useDeleteTransactionItemMutation({
    refetchQueries: [
      {
        query: GET_TRANSACTIONS,
      },
      {
        query: GET_TRANSACTION_ITEMS,
        variables: { transactionId: parseInt(databaseId) },
      },
    ],
  });

  const removeTransactionItem = async () => {
    try {
      await toast.promise(
        deleteTransactionItem({
          variables: {
            transactionItemId: parseInt(tradeItem.databaseId),
          },
        }),
        {
          pending: 'Pending...',
          success: {
            render({ data }) {
              // @ts-ignore
              if (data.data.deleteTransactionItem.ok)
                return 'Deleted the transactionitem';
              else return `Can't delete the transactionitem`;
            },
          },
        },
        {
          theme: 'dark',
        },
      );
    } catch (e) {
      toast.error(`${e}`, {
        theme: 'dark',
      });
    }
  };

  const { data: dataMedias, loading: mediaLoading } = useGetMediaQuery({
    variables: { realItemId: parseInt(realItem.databaseId!) },
  });

  const handleClickCard = async (genericItem: GenericItemObject) => {
    try {
      const id = getGenericId(genericItem.id);
      await toast.promise(
        handleChangeItemId(id),
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

  return (
    <>
      <TableRow hover>
        <TableCell
          sx={{
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'space-between',
            cursor: 'pointer',
            position: 'relative',
            '&:hover .hover-image': {
              visibility: 'visible',
              opacity: 1,
            },
          }}
          onClick={() => setCell(!cell)}
        >
          <Avatar
            variant="rounded"
            src={realItem?.genericItems?.edges[0]?.node?.imageUriLarge!}
            sx={{ '& .MuiAvatar-img': { objectFit: 'contain' } }}
          ></Avatar>
          {cell ? (
            <ExpandLessIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
          ) : (
            <ExpandMoreIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
          )}
          <HoverImage
            url={realItem?.genericItems?.edges[0]?.node?.imageUriLarge!}
          />
        </TableCell>
        <TableCell
          className={cell ? 'cell_display' : 'cell_hidden'}
          sx={{
            position: 'relative',
            '&:hover .hover-image': {
              visibility: { xs: 'hidden', sm: 'visible' },
              opacity: 1,
            },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Card
          </Typography>
          <Link
            to={{
              pathname: `/assets/${realItem?.databaseId}`,
              state: { transactionId: tradeItem.transactionId },
            }}
          >
            <Avatar
              variant="rounded"
              src={realItem?.genericItems?.edges[0]?.node?.imageUriLarge!}
              sx={{
                '& .MuiAvatar-img': { objectFit: 'contain' },
              }}
            >
              <img src="/demo.jpg" alt="fallback" />
            </Avatar>
            <HoverImage
              url={realItem?.genericItems?.edges[0]?.node?.imageUriLarge!}
            />
          </Link>
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Item
          </Typography>
          {realItem?.genericItems?.edges[0]?.node?.name}
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Series
          </Typography>
          {realItem?.genericItems?.edges[0]?.node?.setName}
        </TableCell>
        <TableCell sx={{ color: 'white' }}>
          <ChangeCards onSelect={handleClickCard} buttonText={'Change card'} />
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' }, width: '200px' }}
          >
            Condition
          </Typography>
          <SelectCondition
            value={realItem?.condition}
            onChange={handleChangeCondition}
            disabled={isUpdatingItem}
          />
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            FMV
          </Typography>
          {currencyFormatter({ value: realItem?.fmv as number })}
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Multiplier
          </Typography>
          {multiplier}
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Tradein Value
          </Typography>
          {currencyFormatter({ value: tradeItem?.tradeInValue as number })}
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Status
          </Typography>
          {realItem?.status}
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Media
          </Typography>
          {mediaLoading ? (
            'loading...'
          ) : dataMedias?.media?.length ? (
            <IconButton onClick={() => showDetailModal(true)}>
              <PermMediaIcon />
            </IconButton>
          ) : (
            <Typography>Not Given</Typography>
          )}
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Delete
          </Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              confirmDialog(
                removeTransactionItem,
                'Are you gonna delete this trade item?',
                realItem?.genericItems?.edges[0]?.node?.name!,
              );
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <ItemDetailModal
        open={isOpenDetailModal}
        item={realItem}
        onClose={() => showDetailModal(false)}
        type="observer"
      />
    </>
  );
}

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
import { useReactiveVar } from '@apollo/client';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';

import { currencyFormatter } from '../../helpers';
import { confirmDialog } from '../../components/ConfirmationDialog';
import { Maybe, useDeleteTransactionMutation } from '../../types/graphql';
import { useGetUserQuery } from '../../types/graphql';
import { GET_TRANSACTIONS } from '../../graphql/queries';
import { userEffectiveRoleVar } from '../../graphql';

interface TransactionItemProps {
  date: string | any;
  submit: Maybe<number> | undefined;
  value: Maybe<number> | undefined;
  status: Maybe<string> | undefined;
  databaseId: string | undefined;
  count: Maybe<number> | undefined;
}

interface ColorProps {
  [status: string]: string;
}

const StatusColor: ColorProps = {
  CLIENT_REVIEW: 'yellow',
  PURPLEMANA_REVIEW: '#8051d4',
  TRADEIN_ARRIVING: '#3772ff',
  CREDIT_ISSUED: '#25a56a',
  ARRIVED: '#1DEAEF',
};

export default function TransactionItem(props: TransactionItemProps) {
  const { date, submit, value, status, databaseId, count } = props;

  const userEffectiveRole = useReactiveVar(userEffectiveRoleVar);

  const history = useHistory();
  const [cell, setCell] = useState(false);

  const {
    data: dataSubmitter,
    loading: loadingNames,
    error: errorNames,
  } = useGetUserQuery({
    variables: { userId: submit },
  });

  const handleDetail = () => {
    history.push(`/trade/${databaseId}`);
  };

  const [deleteTransaction] = useDeleteTransactionMutation({
    refetchQueries: [
      {
        query: GET_TRANSACTIONS,
      },
    ],
  });

  const removeTransaction = async () => {
    try {
      await toast.promise(
        deleteTransaction({
          variables: {
            transactionId: parseInt(databaseId as string),
          },
        }),
        {
          pending: 'Pending...',
          success: {
            render({ data }) {
              // @ts-ignore
              if (data.data.deleteTransaction.ok)
                return 'Deleted the transaction';
              else return `Can't delete the transaction`;
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

  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell
          sx={{
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'space-between',
          }}
          onClick={() => setCell(!cell)}
        >
          <Typography>Submitted By</Typography>
          <Typography>
            {loadingNames ? 'loading...' : dataSubmitter?.user?.username}
          </Typography>
          {cell ? (
            <ExpandLessIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
          ) : (
            <ExpandMoreIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
          )}
        </TableCell>
        <TableCell className={cell ? 'cell_display' : 'cell_hidden'}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Trade ID
          </Typography>
          {databaseId}
        </TableCell>
        <TableCell
          className={cell ? 'cell_display' : 'cell_hidden'}
          onClick={handleDetail}
        >
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Date
          </Typography>
          {moment(date).format('MMMM Do YYYY, h:mm A')}
        </TableCell>
        <TableCell
          className={cell ? 'cell_display' : 'cell_hidden'}
          onClick={handleDetail}
        >
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Submitted By
          </Typography>
          {loadingNames ? 'loading...' : dataSubmitter?.user?.username}
        </TableCell>
        <TableCell
          className={cell ? 'cell_display' : 'cell_hidden'}
          onClick={handleDetail}
        >
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Number of Items
          </Typography>
          {count}
        </TableCell>
        <TableCell
          className={cell ? 'cell_display' : 'cell_hidden'}
          onClick={handleDetail}
        >
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Total Value
          </Typography>
          {currencyFormatter({ value: value as number })}
        </TableCell>
        <TableCell
          className={cell ? 'cell_display' : 'cell_hidden'}
          sx={{ color: StatusColor[status as string] }}
          onClick={handleDetail}
        >
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Status
          </Typography>
          {status}
        </TableCell>
        {userEffectiveRole === 'admin' && (
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
                  removeTransaction,
                  'Are you gonna delete this trade?',
                  `Trade ID = ${databaseId}`,
                );
              }}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
    </>
  );
}

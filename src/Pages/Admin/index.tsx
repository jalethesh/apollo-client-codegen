import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useReactiveVar } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

import TransactionItem from './TransactionItem';
import StatusSelector from './StatusSelector';
import InitialLoading from '../../components/Loading/InitialLoading';

import { useGetTransactionsQuery } from '../../types/graphql';
import { userEffectiveRoleVar, userDataVar } from '../../graphql';

export default function Admin() {
  const history = useHistory();

  const {
    data: dataTransaction,
    loading: loadingTransaction,
    error: errorTransaction,
  } = useGetTransactionsQuery();

  const [dateSort, setDateSort] = useState(true);
  const [valueSort, setValueSort] = useState(true);
  const [transactions, setTransactions] = useState(
    dataTransaction?.transactions,
  );
  const [newValue, setNewValue] = useState<string[] | null>([]);
  const userEffectiveRole = useReactiveVar(userEffectiveRoleVar);
  const userData = useReactiveVar(userDataVar);

  const customSort = (prop: any) => {
    var sortOrder = 1;
    if (prop[0] === '-') {
      sortOrder = -1;
      prop = prop.substr(1);
    }
    return function (a: any, b: any) {
      var result = a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0;
      return result * sortOrder;
    };
  };

  const handleDateSort = () => {
    if (dateSort)
      setTransactions(transactions?.slice().sort(customSort('dateCreated')));
    else
      setTransactions(transactions?.slice().sort(customSort('-dateCreated')));
    setDateSort(!dateSort);
  };

  const handleValueSort = () => {
    if (valueSort)
      setTransactions(transactions?.slice().sort(customSort('rightCredit')));
    else
      setTransactions(transactions?.slice().sort(customSort('-rightCredit')));
    setValueSort(!valueSort);
  };

  const handleSelect = useCallback(
    (event: any, newValue: string[] | null) => {
      setNewValue(newValue);
      if (newValue?.length === 0) {
        setTransactions(dataTransaction?.transactions);
      } else {
        setTransactions(
          dataTransaction?.transactions?.filter(function (transaction) {
            return newValue?.indexOf(transaction?.status as string) !== -1;
          }),
        );
      }
    },
    [dataTransaction],
  );

  useEffect(() => {
    handleSelect(true, newValue);
  }, [newValue, handleSelect]);

  if (loadingTransaction) {
    return <InitialLoading />;
  }
  if (errorTransaction) {
    return <div>Error in transaction query</div>;
  }
  if (
    !dataTransaction?.transactions ||
    dataTransaction?.transactions?.length === 0
  ) {
    return <div>No transaction</div>;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ bgcolor: 'purple' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Trade ID</TableCell>
              <TableCell
                sx={{ color: 'white', cursor: 'pointer' }}
                onClick={handleDateSort}
              >
                Date
                <IconButton>
                  {dateSort ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  )}
                </IconButton>
              </TableCell>
              <TableCell sx={{ color: 'white' }}>Submitted By</TableCell>
              <TableCell sx={{ color: 'white' }}>Number of Items</TableCell>
              <TableCell
                sx={{ color: 'white', cursor: 'pointer' }}
                onClick={handleValueSort}
              >
                Total Value
                <IconButton>
                  {valueSort ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  )}
                </IconButton>
              </TableCell>
              <TableCell sx={{ color: 'white' }}>
                <StatusSelector handleSelect={handleSelect} />
              </TableCell>
              {userEffectiveRole === 'admin' && (
                <TableCell sx={{ color: 'white' }}>Delete</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((item, i) => {
              if (userEffectiveRole === 'admin') {
                return (
                  <TransactionItem
                    key={i}
                    date={item?.dateCreated}
                    submit={item?.leftOwner}
                    status={item?.status}
                    databaseId={item?.databaseId}
                    value={item?.rightCredit}
                    count={item?.count}
                  />
                );
              } else if (userEffectiveRole === 'nologin') {
                return <></>;
              } else if (item?.leftOwner === parseInt(userData?.databaseId))
                return (
                  <TransactionItem
                    key={i}
                    date={item?.dateCreated}
                    submit={item?.leftOwner}
                    status={item?.status}
                    databaseId={item?.databaseId}
                    value={item?.rightCredit}
                    count={item?.count}
                  />
                );
              return <></>;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </>
  );
}

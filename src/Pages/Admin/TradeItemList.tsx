import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';

import BackHistory from '../../components/BackHistory';
import TradeItemCard from './TradeItemCard';
import TransactionStatusStepper from './StatusApprove';
import { currencyFormatter } from '../../helpers';
import CustomPagination from '../../components/CustomPagination';
import {
  RealItemObject,
  useGetTransactionsQuery,
  useGetTransactionItemsLazyQuery,
  useGetUserQuery,
} from '../../types/graphql';

import TransactionLog from './TransactionLog';

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

export default function TradeItemList() {
  const { databaseId } = useParams<{ databaseId: string }>();
  const [page, setPage] = useState(0);
  const [paginationLimit, setPaginationLimit] = useState(12);

  const {
    data: transactionData,
    loading: transactionLoading,
    error: transactionError,
  } = useGetTransactionsQuery({
    variables: { transactionId: parseInt(databaseId) },
  });
  const [
    getTransactionItem,
    { data: dataTradeItem, loading: loadingTradeItem, error: errorTradeItem },
  ] = useGetTransactionItemsLazyQuery({
    variables: { transactionId: parseInt(databaseId) },
  });

  const {
    data: dataUser,
    loading: loadingUser,
    error: errorUser,
  } = useGetUserQuery({
    variables: { userId: transactionData?.transactions?.[0]?.leftOwner },
  });

  const handleGetTransactionItem = useCallback(() => {
    getTransactionItem({
      variables: {
        transactionId: parseInt(databaseId),
        page: page,
        perPage: paginationLimit,
      },
    });
  }, [page, paginationLimit, databaseId, getTransactionItem]);

  useEffect(() => {
    if (transactionData) handleGetTransactionItem();
  }, [transactionData, handleGetTransactionItem]);

  if (transactionLoading) {
    return (
      <div>
        <BackHistory />
        Loading...
      </div>
    );
  }

  return (
    <>
      <BackHistory />
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Transaction {databaseId}
      </Typography>
      <Box
        sx={{
          display: { xs: 'Block', sm: 'flex' },
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '400px' } }}>
          <Typography variant="h6">
            Submitted by: {dataUser?.user?.username}
          </Typography>
          <Typography variant="h6">Contact: {dataUser?.user?.email}</Typography>
          <Typography variant="h6">
            Date: {transactionData?.transactions?.[0]?.dateCreated}
          </Typography>
          <Typography variant="h6">
            Total Value:
            {currencyFormatter({
              value: transactionData?.transactions?.[0]?.rightCredit as number,
            })}
          </Typography>
          <Typography variant="h6">
            Count: {transactionData?.transactions?.[0]?.count}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: `${
                StatusColor[
                  transactionData?.transactions?.[0]?.status as string
                ]
              }`,
            }}
          >
            Status: {transactionData?.transactions?.[0]?.status}
          </Typography>
          <Typography variant="h6">
            Admin comment: <br />
            <span style={{ fontSize: '10x' }}>
              {transactionData?.transactions?.[0]?.adminComment}
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: 'block', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <TransactionStatusStepper
            status={transactionData?.transactions?.[0]?.status as string}
          />
          <CustomPagination
            page={page}
            perPage={paginationLimit}
            count={transactionData?.transactions?.[0]?.count as number}
            setHandlePage={setPage}
            setHandlePerPage={setPaginationLimit}
          />
        </Box>
      </Box>
      <TransactionLog />
      {loadingTradeItem ? (
        <>loading...</>
      ) : (
        <TableContainer component={Paper} sx={{ overflow: 'visible' }}>
          <Table aria-label="simple table">
            <TableHead sx={{ bgcolor: 'purple' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Card</TableCell>
                <TableCell sx={{ color: 'white' }}>Item</TableCell>
                <TableCell sx={{ color: 'white' }}>Series</TableCell>
                <TableCell sx={{ color: 'white' }}> </TableCell>
                <TableCell sx={{ color: 'white' }}>Condition</TableCell>
                <TableCell sx={{ color: 'white' }}>FMV</TableCell>
                <TableCell sx={{ color: 'white' }}>Multiplier</TableCell>
                <TableCell sx={{ color: 'white' }}>Trade-in Value</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Media</TableCell>
                <TableCell sx={{ color: 'white' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTradeItem?.transactionItems?.length === 0 ? (
                <>No Trade Item</>
              ) : (
                dataTradeItem?.transactionItems?.map((transactionItem, i) => (
                  <TradeItemCard
                    key={i}
                    tradeItem={transactionItem}
                    realItem={
                      transactionItem?.realItems?.edges?.[0]
                        ?.node as RealItemObject
                    }
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {errorTradeItem && <>Error in query trade item</>}
      <ToastContainer />
    </>
  );
}

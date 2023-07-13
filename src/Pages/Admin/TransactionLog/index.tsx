import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import TransactionLogList from './LogList';
import CreateTransactionLog from './CreateLog';
import { useTransactionLogsQuery } from '../../../types/graphql';

export default function TransactionLog() {
  const { databaseId } = useParams<{ databaseId: string }>();

  const {
    data: transactionLogsData,
    loading: transactionLogsLoading,
    error: transactionLogsError,
  } = useTransactionLogsQuery({
    variables: { transactionId: parseInt(databaseId) },
  });

  return (
    <>
      <Box sx={{ my: 3 }}>
        <TransactionLogList
          transactionLogs={transactionLogsData?.transactionLogs}
          isLoading={transactionLogsLoading}
        />
        <CreateTransactionLog />
      </Box>
    </>
  );
}

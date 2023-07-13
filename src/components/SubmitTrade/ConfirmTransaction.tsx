import React, { useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from '@mui/material';
import TradeInfoDetail from './TradeInfoDetail';
import { currencyFormatter } from '../../helpers';

import {
  useGetRealItemsTradeInfoLazyQuery,
  RealItemObject,
} from '../../types/graphql';

interface ConfirmTransactionProps {
  open: boolean;
  listId: number;
  itemlength: number;
  handleDisagree: () => void;
  handleAgree: () => void;
}

export default function ConfirmTransaction(props: ConfirmTransactionProps) {
  const { open, listId, itemlength, handleDisagree, handleAgree } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [
    getTradeInfo,
    { data: tradeInfoData, loading: tradeLoading, error: tradeError },
  ] = useGetRealItemsTradeInfoLazyQuery({
    variables: { itemListId: listId, page: 0, perPage: itemlength },
    fetchPolicy: 'network-only',
  });

  const tradeData = useMemo(() => tradeInfoData, [tradeInfoData]);

  useEffect(() => {
    if (open) {
      getTradeInfo();
    }
  }, [open, getTradeInfo]);

  return (
    <Dialog
      open={open}
      fullScreen
      keepMounted
      onClose={handleDisagree}
      aria-describedby="alert-dialog-slide-description"
    >
      {tradeLoading ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}
        >
          <CircularProgress color="inherit" size={50} />
        </Box>
      ) : (
        <>
          <DialogTitle>
            Trade-in "{tradeData?.itemLists?.[0]?.name}" list for credit?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              align="center"
            >
              Please review the items and confirm.
            </DialogContentText>

            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
              <Table aria-label="simple table">
                <TableHead
                  sx={{
                    bgcolor: '#8051d4',
                    display: 'table-header-group !important',
                  }}
                >
                  <TableRow sx={{ display: 'table-row !important' }}>
                    <TableCell
                      sx={{
                        display: 'table-cell !important',
                        padding: { xs: '8px', sm: '16px' },
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        display: 'table-cell !important',
                        padding: { xs: '8px', sm: '16px' },
                      }}
                    >
                      Condition
                    </TableCell>
                    <TableCell
                      sx={{
                        display: 'table-cell !important',
                        padding: { xs: '8px', sm: '16px' },
                      }}
                    >
                      Fair Market Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tradeData?.itemLists?.[0]?.realItems?.edges.map(
                    (realitem, index) => {
                      return (
                        <TradeInfoDetail
                          realItem={realitem?.node as RealItemObject}
                          key={index}
                        />
                      );
                    },
                  )}
                  <TableRow sx={{ display: 'table-row !important' }}>
                    <TableCell
                      sx={{
                        display: 'table-cell !important',
                        padding: { xs: '8px', sm: '16px' },
                        color: 'yellow',
                      }}
                      colSpan={2}
                    ></TableCell>
                    <TableCell
                      sx={{
                        display: 'table-cell !important',
                        padding: { xs: '8px', sm: '16px' },
                        color: 'yellow',
                      }}
                      colSpan={1}
                      align={'left'}
                    >
                      {`${currencyFormatter({
                        value: tradeData?.itemLists?.[0]?.value as number,
                      })}`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button variant="contained" onClick={handleDisagree}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleAgree}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

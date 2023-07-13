import React, { useState } from 'react';
import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast } from 'react-toastify';
import { useReactiveVar } from '@apollo/client';

import DenyComment from './DenyComment';
import { userEffectiveRoleVar } from '../../graphql';

import { useUpdateTransactionStatusMutation } from '../../types/graphql';
import { GET_TRANSACTION_ITEMS, GET_TRANSACTIONS } from '../../graphql/queries';
import { confirmDialog } from '../../components/ConfirmationDialog';

const steps = [
  'User submitted list',
  'Approve over web?',
  'Package arrived to warehouse?',
  'Cards started grading?',
  'Cards finished grading?',
  'Client must approve grades',
  'Client accepted grades. Final PM approval',
  'Issue credit to user?',
  'Credit issued and transaction is complete.',
];
interface TransactionStatusProps {
  [status: string]: string;
}

interface StatusIndex {
  [status: string]: number;
}

const TransactionApproveStatus: TransactionStatusProps = {
  CLIENT_REVIEW: 'PURPLEMANA_REVIEW',
  PURPLEMANA_REVIEW: 'TRADEIN_ARRIVING',
  TRADEIN_ARRIVING: 'ARRIVED',
  ARRIVED: 'GRADING',
  GRADING: 'GRADED',
  GRADED: 'FINAL_CLIENT_REVIEW',
  FINAL_CLIENT_REVIEW: 'FINAL_PM_REVIEW',
  FINAL_PM_REVIEW: 'CREDIT_ISSUED',
};

const TransactionDenyStatus: TransactionStatusProps = {
  PURPLEMANA_REVIEW: 'CLIENT_REVIEW',
  FINAL_PM_REVIEW: 'FINAL_CLIENT_REVIEW',
};

const statusIndex: StatusIndex = {
  CLIENT_REVIEW: 0,
  PURPLEMANA_REVIEW: 1,
  TRADEIN_ARRIVING: 2,
  ARRIVED: 3,
  GRADING: 4,
  GRADED: 5,
  FINAL_CLIENT_REVIEW: 6,
  FINAL_PM_REVIEW: 7,
  CREDIT_ISSUED: 8,
};

interface StatusProps {
  status?: string;
}

export default function TransactionStatusStepper(props: StatusProps) {
  const { status } = props;

  const { databaseId } = useParams<{ databaseId: string }>();
  const mobile = useMediaQuery('(max-width:600px)');
  const [showDenyDialog, setShowDenyDialog] = useState(false);
  const userEffectiveRole = useReactiveVar(userEffectiveRoleVar);

  const [
    updateTransactionStatus,
    { loading: isUpdating, error: transactionError },
  ] = useUpdateTransactionStatusMutation({
    refetchQueries: [
      {
        query: GET_TRANSACTIONS,
        variables: { transactionId: parseInt(databaseId) },
      },
      {
        query: GET_TRANSACTION_ITEMS,
        variables: { transactionId: parseInt(databaseId) },
      },
    ],
  });

  const approveTransaction = async () => {
    try {
      await toast.promise(
        updateTransactionStatus({
          variables: {
            status: TransactionApproveStatus[status as string],
            transactionId: parseInt(databaseId),
          },
        }),
        {
          pending: 'Submitted approval...',
          success: 'Update successful',
          error: 'Update error',
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

  const denyTransaction = async (comment: string) => {
    try {
      await toast.promise(
        updateTransactionStatus({
          variables: {
            adminComment: comment,
            status: TransactionDenyStatus[status as string],
            transactionId: parseInt(databaseId),
          },
        }),
        {
          pending: 'Deny is on pending',
          success: 'Deny has been resolved 👌',
          error: 'Deny has been rejected 🤯',
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
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={statusIndex[status as string]}
        alternativeLabel={!mobile}
        orientation={mobile ? 'vertical' : 'horizontal'}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {userEffectiveRole === 'admin' && (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          {status === 'PURPLEMANA_REVIEW' && (
            <Button onClick={() => setShowDenyDialog(true)}>Deny</Button>
          )}
          <Button
            onClick={() => {
              confirmDialog(
                approveTransaction,
                'Approve transaction?',
                'You are about to approve the current transaction. Are you sure?',
              );
            }}
            disabled={status === 'CREDIT_ISSUED'}
          >
            {status === 'CREDIT_ISSUED' ? 'Completed' : 'Approve'}
          </Button>
        </Box>
      )}
      <DenyComment
        open={showDenyDialog}
        handleClose={() => setShowDenyDialog(false)}
        handleComment={denyTransaction}
      />
    </Box>
  );
}

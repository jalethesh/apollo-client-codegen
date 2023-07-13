import React, { useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import AssetDetailTitle from '../../../components/AssetDetailTitle';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistoryIcon from '@mui/icons-material/History';
import { TransactionLogObject, Maybe } from '../../../types/graphql';

interface TransactionLogListProps {
  transactionLogs: Maybe<Array<Maybe<TransactionLogObject>>> | undefined;
  isLoading: boolean;
}

export default function TransactionLogList(props: TransactionLogListProps) {
  const { transactionLogs, isLoading } = props;

  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <AssetDetailTitle title="Transaction Logs" titleIcon={<HistoryIcon />} />
      <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : transactionLogs ? (
          transactionLogs.map((transactionLog, index) => {
            return (
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                key={index}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: '60%',
                      color: 'text.secondary',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {transactionLog?.message}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {moment(transactionLog?.dateCreated).format(
                      'MMMM Do YYYY, h:mm A',
                    )}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {transactionLog?.message}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          'No transaction logs'
        )}
      </Box>
    </>
  );
}

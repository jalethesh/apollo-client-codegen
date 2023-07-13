import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { TableRow, TableCell, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { currencyFormatter } from '../../helpers';
import { confirmDialog } from '../../components/ConfirmationDialog';

export default function ItemListRow(props: any) {
  const { row, handleDeleteItemList } = props;
  const history = useHistory();
  const [cell, setCell] = useState(false);

  const handleDetail = () => {
    history.push(`/lists/${row.databaseId}`);
  };

  const handleDeleteConfirm = () => {
    handleDeleteItemList(row.databaseId);
  };

  return (
    <>
      <TableRow key={row.databaseId} hover sx={{ cursor: 'pointer' }}>
        <TableCell
          component="th"
          scope="row"
          sx={{ cursor: 'pointer' }}
          onClick={handleDetail}
          className="cell_hidden"
        >
          {row.databaseId}
        </TableCell>
        <TableCell align="left" onClick={handleDetail}>
          {row.name || '___'}
        </TableCell>
        <TableCell
          align="left"
          onClick={handleDetail}
          sx={{ justifyContent: 'flex-start !important' }}
        >
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Quantity : &nbsp; &nbsp;
          </Typography>
          {row.count || '___'}
        </TableCell>
        <TableCell
          align="left"
          onClick={handleDetail}
          sx={{ justifyContent: 'flex-start !important' }}
        >
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Value : &nbsp; &nbsp;
          </Typography>
          {row.value ? currencyFormatter({ value: row.value }) : '___'}
        </TableCell>
        <TableCell align="left" onClick={handleDetail}>
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Last Updated
          </Typography>
          {row.dateUpdated || '___'}
        </TableCell>
        <TableCell align="center">
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            Delete list
          </Typography>
          <IconButton
            size="small"
            color={'secondary'}
            onClick={(e) => {
              e.stopPropagation();
              confirmDialog(
                handleDeleteConfirm,
                'Are you gonna delete this list?',
                row.name,
              );
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

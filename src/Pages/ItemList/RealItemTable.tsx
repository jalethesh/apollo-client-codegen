import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import RealItemCardRow from './RealItemCardRow';

interface RealItemListProps {
  items: any;
  onDelete: (databaseId: string) => void;
  collectionDatabaseId: number | undefined;
  page: number;
  perPage: number;
  listId: number;
}

export default function RealItemTable(props: RealItemListProps) {
  const { items, onDelete, collectionDatabaseId, page, perPage, listId } =
    props;

  return (
    <TableContainer component={Paper} sx={{ overflow: 'visible' }}>
      <Table aria-label="simple table">
        <TableHead sx={{ bgcolor: 'purple' }}>
          <TableRow>
            <TableCell />
            <TableCell sx={{ color: 'white' }}>Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Condition</TableCell>
            <TableCell sx={{ color: 'white' }}>Estimated Price</TableCell>
            <TableCell sx={{ color: 'white' }}>For Sale Price</TableCell>
            <TableCell sx={{ color: 'white' }}>Status</TableCell>
            <TableCell sx={{ color: 'white' }}>Update</TableCell>
            <TableCell sx={{ color: 'white' }}>Media</TableCell>
            <TableCell sx={{ color: 'white' }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: any) => (
            <RealItemCardRow
              key={'real-items-table' + item.databaseId}
              data={item}
              collectionDatabaseId={collectionDatabaseId}
              onDelete={onDelete}
              page={page}
              perPage={perPage}
              listId={listId}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

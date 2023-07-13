import React, { useCallback } from 'react';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';

import ItemListRow from './ItemListRow';

import {
  useDeleteItemListMutation,
  ItemListsObject,
  Maybe,
} from '../../types/graphql';
import { GET_ITEM_LISTS } from '../../graphql/queries';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'purple',
    color: theme.palette.common.white,
    fontSize: 20,
  },
}));

interface ItemsListsTableProps {
  itemLists:
    | Maybe<
        Maybe<
          { __typename: 'ItemListsObject' } & Pick<
            ItemListsObject,
            'databaseId' | 'name' | 'count' | 'value' | 'dateUpdated'
          >
        >[]
      >
    | undefined;
}

function createData(
  databaseId: any,
  name: any,
  count: any,
  value: any,
  dateUpdated: any,
) {
  return { databaseId, name, count, value, dateUpdated };
}

export default function ItemListsTable(props: ItemsListsTableProps) {
  const { itemLists } = props;

  const [deleteItemList] = useDeleteItemListMutation({
    refetchQueries: [{ query: GET_ITEM_LISTS }],
  });

  const handleDeleteItemList = useCallback(
    async (listId: number) => {
      try {
        await toast.promise(
          deleteItemList({
            variables: { databaseId: listId },
          }),
          {
            pending: 'Request is on pending...',
            success: {
              render({ data }) {
                // @ts-ignore
                if (data.data.deleteItemList.ok) return 'Deleted the list';
                else return `Can't delete the list`;
              },
            },
            error: 'Request error',
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
    },
    [deleteItemList],
  );

  const rows = itemLists
    ? itemLists?.map((itemList: any) =>
        createData(
          itemList.databaseId,
          itemList.name,
          itemList.count,
          itemList.value,
          moment(itemList.dateUpdated).format('MMMM Do YYYY, h:mm A'),
        ),
      )
    : [];

  if (rows) {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead sx={{ bgcolor: 'purple' }}>
            <TableRow hover>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Count</StyledTableCell>
              <StyledTableCell align="left">Value</StyledTableCell>
              <StyledTableCell align="left">Updated</StyledTableCell>
              <StyledTableCell align="center">Delete list</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index) => (
              <ItemListRow
                key={index}
                row={row}
                handleDeleteItemList={handleDeleteItemList}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <div>Some error...</div>;
  }
}

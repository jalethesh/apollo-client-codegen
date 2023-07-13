import React from 'react';
import ItemControlHeader from './ItemControlHeader';
import {
  useCreateItemListMutation,
  useGetItemListsQuery,
} from '../../types/graphql';
import ItemListsTable from './ItemListsTable';
import InitialLoading from '../../components/Loading/InitialLoading';
import { GET_ITEM_LISTS } from '../../graphql/queries';
import { ToastContainer } from 'react-toastify';

export default function Collect() {
  // query userLists for lists and stats
  const {
    data: itemListData,
    loading: loadingData,
    error: errorData,
  } = useGetItemListsQuery();
  // make table one row for each userList returned
  // row has summary data and links to /lists/:id

  const [createItemList] = useCreateItemListMutation({
    refetchQueries: [{ query: GET_ITEM_LISTS }],
  });

  if (loadingData) {
    return <InitialLoading />;
  } else if (errorData) {
    return <div>Some error</div>;
  } else {
    return (
      <>
        <ItemControlHeader createItemList={createItemList} />
        <ItemListsTable itemLists={itemListData?.itemLists} />
        <ToastContainer />
      </>
    );
  }
}

import React, { useState } from 'react';
import './index.css';
import PublishedItemsDisplay from './PublishedItemsDisplay';
import { useGetPublishedRealItemsQuery } from '../../types/graphql';

export default function Buy() {
  const [page, setPage] = useState<number>(0);
  const [paginationLimit, setPaginationLimit] = useState<number>(6);
  const {
    data: itemsData,
    loading: loadingItems,
    error: errorItems,
  } = useGetPublishedRealItemsQuery({
    variables: {
      page: page,
      perPage: paginationLimit,
    },
  });

  return (
    <PublishedItemsDisplay
      itemsData={itemsData}
      page={page}
      paginationLimit={paginationLimit}
      setPage={setPage}
      setPaginationLimit={setPaginationLimit}
    />
  );
}

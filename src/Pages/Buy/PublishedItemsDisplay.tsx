import React from 'react';
import CustomPagination from '../../components/CustomPagination';
import ItemGrid from './ItemGrid';
import { useCountPublishedQuery } from '../../types/graphql';

interface ItemListDataDisplayProps {
  itemsData: any;
  page: number;
  setPage: any;
  paginationLimit: number;
  setPaginationLimit: any;
}

export default function PublishedItemsDisplay(props: ItemListDataDisplayProps) {
  const { itemsData, page, setPage, paginationLimit, setPaginationLimit } =
    props;

  const { data: publishedCountData, loading, error } = useCountPublishedQuery();

  return (
    <div>
      <CustomPagination
        page={page}
        perPage={paginationLimit}
        count={
          publishedCountData?.countPublished
            ? publishedCountData?.countPublished
            : 12
        }
        setHandlePage={setPage}
        setHandlePerPage={setPaginationLimit}
      />
      <ItemGrid
        realItems={itemsData?.realItems}
        page={page}
        perPage={paginationLimit}
      />
    </div>
  );
}

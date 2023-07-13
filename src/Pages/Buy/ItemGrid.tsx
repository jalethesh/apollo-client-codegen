import React from 'react';
import Grid from '@mui/material/Grid';
import MediaCard from './MediaCard';

interface ItemGridProps {
  realItems: any;
  page: number;
  perPage: any;
}

export default function ItemGrid(props: ItemGridProps) {
  const { realItems, page, perPage } = props;

  return (
    <Grid container spacing={2} columns={{ xs: 1, sm: 3, md: 4, lg: 6 }}>
      {realItems?.map((item: any) => (
        <Grid key={item?.databaseId} item xs={1} sm={1} md={1} lg={1}>
          <MediaCard item={item} page={page} perPage={perPage} />
        </Grid>
      ))}
    </Grid>
  );
}

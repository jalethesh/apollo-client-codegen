import React from 'react';
import { Stack, Grid, Divider, Box } from '@mui/material';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import AssetDetailTitle from '../../components/AssetDetailTitle';
import RecentSale from '../../components/SaleComponent/RecentSale';
import AvailableSale from '../../components/SaleComponent/AvailableSale';

interface recentSaleType {
  condition: string;
  price: number;
  seller: string;
  date: string;
  where: string;
}

interface availableSaleType {
  condition: string;
  price: number;
  seller: string;
}

const recentSaleData: recentSaleType[] = [
  {
    condition: 'HP',
    price: 5999,
    seller: 'Moss Dog',
    date: '9/16/21',
    where: 'Purplemana',
  },
  {
    condition: 'HP',
    price: 5999,
    seller: 'Moss Dog',
    date: '9/16/21',
    where: 'Purplemana',
  },
  {
    condition: 'HP',
    price: 5999,
    seller: 'Moss Dog',
    date: '9/16/21',
    where: 'Purplemana',
  },
];

const availableSaleData: availableSaleType[] = [
  { condition: 'MP', price: 5999, seller: 'Archangel' },
  { condition: 'MP', price: 5999, seller: 'Archangel' },
  { condition: 'MP', price: 5999, seller: 'Archangel' },
];

export default function SaleInfo() {
  return (
    <Stack spacing={2}>
      <Grid container spacing={2} sx={{ height: { xs: 'auto', lg: '100vh' } }}>
        <Grid item xs={12} lg={6}>
          <AssetDetailTitle
            title="Recent sales:"
            titleIcon={<AssistantPhotoIcon />}
          />
          {recentSaleData.map((data, index) => {
            return (
              <Box key={index}>
                <RecentSale
                  date={data.date}
                  where={data.where}
                  condition={data.condition}
                  price={data.price}
                  seller={data.seller}
                />
                <Divider />
              </Box>
            );
          })}
        </Grid>
        <Grid item xs={12} lg={6}>
          <AssetDetailTitle
            title="Available for sale:"
            titleIcon={<EventAvailableIcon />}
          />
          {availableSaleData.map((data, index) => {
            return (
              <Box key={index}>
                <AvailableSale
                  condition={data.condition}
                  price={data.price}
                  seller={data.seller}
                />
                <Divider />
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Stack>
  );
}

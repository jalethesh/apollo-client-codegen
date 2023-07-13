import React from 'react';
import { useParams } from 'react-router';
import { Stack, Typography } from '@mui/material';

import RealItemInfo from './RealItemInfo';
import PriceInfo from './PriceInfo';
import SaleInfo from './SaleInfo';
import './index.css';
import BackHistory from '../../components/BackHistory';

import { RealItemObject, useGetRealItemQuery } from '../../types/graphql';

export default function Asset() {
  const { databaseId } = useParams<{ databaseId: string }>();

  const {
    data: dataRealItem,
    loading: loadingRealItem,
    error: errorRealItem,
  } = useGetRealItemQuery({
    variables: { realItemId: parseInt(databaseId) },
  });

  const genericItemId = dataRealItem?.realItems?.[0]?.itemId;
  const realItemdata = dataRealItem?.realItems?.[0] as RealItemObject;
  const itemIndex =
    dataRealItem?.realItems?.[0]?.genericItems?.edges?.[0]?.node?.itemIndex;

  if (loadingRealItem) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Stack spacing={2}>
      <BackHistory />
      <RealItemInfo realItemdata={realItemdata} />
      <PriceInfo genericItemId={genericItemId} itemIndex={itemIndex} />
      <SaleInfo />
    </Stack>
  );
}

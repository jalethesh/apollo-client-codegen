import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Stack, Grid, Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import UpdateIcon from '@mui/icons-material/Update';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { Button } from '@mui/material';

import AssetDetailTitle from '../../components/AssetDetailTitle';
import { currencyFormatter } from '../../helpers';
import { useReactiveVar } from '@apollo/client';
import {
  useGetLatestOffersSeriesQuery,
  useGetLatestOffersQuery,
} from '../../types/graphql';
import { Maybe } from '../../types/graphql';
import { ChartData } from '../../types/Models';
import PriceChart from '../../components/ChartComponent/PriceChart';
import { userEffectiveRoleVar } from '../../graphql';

interface PriceInfoProps {
  genericItemId: Maybe<number> | undefined;
  itemIndex: Maybe<string> | undefined;
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

const backend_uri = process.env.REACT_APP_JUZAM2_URI;

const defaultChartData: ChartData[] = [
  {
    time: 0,
    y_position: 0,
    price: 0,
  },
];

export default function PriceInfo(props: PriceInfoProps) {
  const { genericItemId, itemIndex } = props;
  const userEffectiveRole = useReactiveVar(userEffectiveRoleVar);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [highestValue, setHighestValue] = useState<number | undefined>(0);
  const [lowestValue, setLowestValue] = useState<number | undefined>(0);
  const [currentValue, setCurrentValue] = useState<number | undefined>(0);
  const [offersData, setOffersData] = useState<ChartData[]>(defaultChartData);

  const {
    data: dataOffer,
    loading: loadingOffer,
    error: errorOffer,
  } = useGetLatestOffersQuery({
    variables: { genericItemId: genericItemId },
  });

  const {
    data: dataOfferSeries,
    loading: loadingOfferSeries,
    error: errorOfferSeries,
  } = useGetLatestOffersSeriesQuery({
    variables: { genericItemId: genericItemId },
  });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    let offersChartData = defaultChartData;
    if (dataOfferSeries?.latestOffers) {
      let timeSeries = dataOfferSeries?.latestOffers?.[0]?.timeSeries || [];
      offersChartData = timeSeries.map(function (item) {
        let value = item?.amount || 0;
        return {
          time: item?.lastUpdated || '',
          y_position: value,
          price: value,
        };
      });
      let sortedArray = [...offersChartData];
      sortedArray.sort(function (a: ChartData, b: ChartData) {
        return a.price - b.price;
      });
      setCurrentValue(offersChartData?.[0].price);
      setLowestValue(sortedArray?.[0].price);
      setHighestValue(sortedArray?.[sortedArray.length - 1 || 0].price);
      offersChartData.map(
        (chartData, i) =>
          (offersChartData[i].y_position =
            chartData.y_position - sortedArray?.[0].price),
      );
      offersChartData.reverse();
      setOffersData(offersChartData);
    }
  }, [dataOfferSeries]);

  const handleModify = () => {
    window.open(`${backend_uri}/offer_pricing/${itemIndex}`, '_blank');
  };

  return (
    <Stack spacing={2}>
      <Grid container spacing={2} sx={{ height: { xs: 'auto', lg: '100vh' } }}>
        <Grid item xs={12} lg={6}>
          <AssetDetailTitle
            title="Pricing History"
            titleIcon={<PriceChangeIcon />}
          />
          <Stack spacing={2}>
            <Item sx={{ display: 'flex' }}>
              <Typography
                sx={{ color: 'text.secondary', width: '40%', flexShrink: 0 }}
              >
                Highest Value
              </Typography>
              <Typography>${highestValue}</Typography>
            </Item>
            <Item sx={{ display: 'flex' }}>
              <Typography
                sx={{ color: 'text.secondary', width: '40%', flexShrink: 0 }}
              >
                Lowest Value
              </Typography>
              <Typography>${lowestValue}</Typography>
            </Item>
            <Item sx={{ display: 'flex' }}>
              <Typography
                sx={{ color: 'text.secondary', width: '40%', flexShrink: 0 }}
              >
                Current Value
              </Typography>
              <Typography>${currentValue}</Typography>
            </Item>
          </Stack>
          {offersData !== defaultChartData ? (
            <PriceChart data={offersData} height="200" />
          ) : (
            <Box>No chart data</Box>
          )}
        </Grid>
        <Grid item xs={12} lg={6}>
          <AssetDetailTitle
            title="Recent Buylist Offers"
            titleIcon={<UpdateIcon />}
          />
          {loadingOffer ? (
            <Typography>Loading...</Typography>
          ) : dataOffer ? (
            dataOffer.latestOffers?.[0]?.latestOffersHistory?.edges.map(
              (historyitem, index) => {
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
                          width: '15%',
                          flexShrink: 0,
                          color: 'text.secondary',
                        }}
                      >
                        {historyitem?.node?.condition}
                      </Typography>
                      <Typography sx={{ width: '20%', flexShrink: 0 }}>
                        {currencyFormatter({
                          value: historyitem?.node?.amount as number,
                        })}
                      </Typography>
                      <Typography
                        sx={{ width: '20%', color: 'text.secondary' }}
                      >
                        {historyitem?.node?.merchant}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {moment(historyitem?.node?.lastUpdated).format(
                          'MMMM Do YYYY, h:mm A',
                        )}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {historyitem?.node?.merchant}&nbsp; &nbsp; updated
                        &nbsp;
                        {historyitem?.node?.cardType}
                        &nbsp; on &nbsp;
                        {moment(historyitem?.node?.lastUpdated).format(
                          'MMMM Do YYYY, h:mm A',
                        )}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              },
            )
          ) : (
            'No history'
          )}
        </Grid>
      </Grid>
      {userEffectiveRole === 'admin' && (
        <Button variant="outlined" onClick={handleModify} color="warning">
          Modify the price of this generic Card
        </Button>
      )}
    </Stack>
  );
}

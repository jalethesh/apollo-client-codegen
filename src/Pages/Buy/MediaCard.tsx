import React, { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ToastContainer, toast } from 'react-toastify';

import ItemDetailModal from '../../components/CollectionComponent/ItemDetailModal';

import {
  RealItemObject,
  useGetMediaQuery,
  useBuyRealItemWithCreditMutation,
} from '../../types/graphql';
import { GET_USER, GET_PUBLISHED_REAL_ITEMS } from '../../graphql/queries';

interface MedidCardProps {
  item: RealItemObject;
  page: number;
  perPage: number;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default function MediaCard(props: MedidCardProps) {
  const { item, page, perPage } = props;
  const [isOpenDetail, showDetail] = useState(false);
  const realItemId = item.databaseId;

  const { data: dataMedias } = useGetMediaQuery({
    variables: { realItemId: parseInt(item.databaseId!) },
  });

  const [buyRealItem] = useBuyRealItemWithCreditMutation({
    refetchQueries: [
      {
        query: GET_PUBLISHED_REAL_ITEMS, // this query is filtered for the user by default
        variables: { page: page, perPage: perPage },
      },
      {
        query: GET_USER,
      },
    ],
  });

  const handleBuyRealItem = useCallback(
    async (realItemId: string) => {
      try {
        await buyRealItem({
          variables: { realItemId: parseInt(realItemId) },
        });
      } catch (error) {
        toast.error(`${error}`, {
          theme: 'dark',
        });
      }
    },
    [buyRealItem],
  );

  const handleSelectCard: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    showDetail(true);
  };

  const medias = useMemo(() => dataMedias?.media || [], [dataMedias]);
  const isStockMedia = medias.length === 0;

  return (
    <>
      <Card sx={{ borderRadius: 4 }}>
        <CardActionArea onClick={handleSelectCard}>
          <Box position="relative">
            <CardMedia
              component="img"
              image={
                isStockMedia
                  ? item.genericItems?.edges[0]?.node?.imageUriLarge || ''
                  : medias[0]?.mediaUrl || ''
              }
              height="100%"
              sx={{
                objectFit: 'contain',
                border: 6,
                borderRadius: 4,
                borderColor: 'purple',
                // ...(isStockMedia ? { filter: "blur(5px)" } : {}),
              }}
            />
            {isStockMedia && (
              <CardMedia
                component="div"
                sx={{
                  textAlign: 'center',
                  overflow: 'hidden',
                  position: 'absolute',
                  bottom: 0,
                  right: -10,
                  width: '150px',
                  height: '150px',
                  zIndex: 1,
                }}
              >
                <Box
                  component="span"
                  position="absolute"
                  sx={{
                    left: '-15px',
                    bottom: '40px',
                    display: 'block',
                    width: '200px',
                    padding: '8px 0',
                    bgcolor: 'yellow',
                    textAlign: 'center',
                    transform: 'rotate(-45deg)',
                    fontWeight: 'bolder',
                    fontSize: '18px',
                    color: 'black',
                    boxShadow: '0 5px 10px rgba(0,0,0,.1)',
                  }}
                >
                  STOCK IMAGE
                </Box>
              </CardMedia>
            )}
          </Box>
        </CardActionArea>
        <CardHeader
          title={
            <>
              {item.genericItems?.edges[0]?.node?.name}
              <br />

              {`${item.genericItems?.edges[0]?.node?.setName}`}
              <br />
              {`Condition: ${item.condition}`}
              <br />
              {'Price: ' + formatter.format(item.forsalePrice || 0)}
            </>
          }
          titleTypographyProps={{ variant: 'body1', noWrap: true }}
          sx={{ '& .MuiCardHeader-content': { minWidth: 0 } }}
        />
        <CardActions>
          <Button
            onClick={() => handleBuyRealItem(realItemId)}
            variant="contained"
          >
            {'Buy With Credit Instantly'}
          </Button>{' '}
          <br />
        </CardActions>
        <CardActions>
          <Typography>More details </Typography>
          <Link to={`/assets/${realItemId}`}>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
      <ItemDetailModal
        open={isOpenDetail}
        onClose={() => showDetail(false)}
        item={item}
      />
      <ToastContainer />
    </>
  );
}

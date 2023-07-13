import React, { useState } from 'react';
import CardModal from '../../components/CardImgModal';
import { Link, Box, Typography, Button, Stack } from '@mui/material';
import { responsiveCardWidth } from './Validate';

type Props = {
  title: string;
  url: string;
  winningBid: number;
  listingDate: string;
  numberOfBids: number;
  imageUrls: string[];
};

export default function ToMatchCard ({
  title,
  url,
  winningBid,
  imageUrls,
  numberOfBids,
  listingDate,
}: Props)  {
  const [imageIndex, setImageIndex] = useState(0);
  const [cardShow, setCardShow] = useState(false);
  const filteredImageUrls = imageUrls.filter((image) => image);

  const navigateCarousel = (isNext: boolean, event: any) => {
    event.stopPropagation();
    if (isNext) {
      setImageIndex(
        imageIndex === filteredImageUrls.length - 1 ? 0 : imageIndex + 1,
      );
    } else {
      setImageIndex(
        imageIndex === 0 ? filteredImageUrls.length - 1 : imageIndex - 1,
      );
    }
  };
  return (
    <Box
      sx={{
        maxWidth: responsiveCardWidth,
        textAlign: 'center',
      }}
    >
      <Link
        textAlign="center"
        href={url}
        sx={{ textDecoration: 'none' }}
        target="_blank"
        rel="noreferrer"
      >
        <Typography variant="h6">{title}</Typography>
      </Link>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
        onClick={() => setCardShow(true)}
      >
        {filteredImageUrls.map((url, idx) => (
          <Box
            key={url}
            component="img"
            src={url}
            alt="nothing"
            sx={{
              display: imageIndex === idx ? 'block' : 'none',
              maxWidth: '100%',
              border: 6,
              borderRadius: 4,
              borderColor: 'gray',
            }}
          />
        ))}
        <Box
          sx={{
            position: 'absolute',
            height: '100%',
            width: '95%',
            zIndex: '99',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="text"
            sx={{ height: '100%' }}
            onClick={(event) => navigateCarousel(false, event)}
          >
            {'<'}
          </Button>
          <Button
            variant="text"
            sx={{ height: '100%' }}
            onClick={(event) => navigateCarousel(true, event)}
          >
            {'>'}
          </Button>
        </Box>
      </Box>

      <Typography>
        {imageIndex + 1}/{filteredImageUrls.length}
      </Typography>
      <Typography>Winning Bid: {winningBid}</Typography>
      <Typography>Number of Bid: {numberOfBids}</Typography>
      <Typography>Listing Date: {listingDate} </Typography>
      <CardModal
        imageUrl={imageUrls[imageIndex]}
        handleModal={(open: boolean) => setCardShow(open)}
        cardShow={cardShow}
      />
    </Box>
  );
};


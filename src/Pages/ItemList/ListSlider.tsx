import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import bgBanner from '../../assets/background/bg-slider.png';

import { Maybe } from '../../types/graphql';

const ListSliderBox = styled(Box)(
  () => `
  background: url(${bgBanner});
  margin-left: 10px;
  background-size: 100% 100%;
  width: 10px;
  padding: 0 20px;
  flex-grow: 1;
  height: 48px;
  `,
);

const ListSliderContain = styled(Box)(
  () => `
  overflow: hidden;
  height: 100%;
  width: 100%;
  `,
);

const ListSliderWrapper = styled(Box)(
  () => `
  display: flex;
  animation: listSlider 20s linear infinite;
  width: max-content;
  height: 100%;
  align-items: center;
  @keyframes listSlider {
    0% {
      transform: translateX(0);
    }
  
    100% {
      transform: translateX(-50%);
    }
  }
  `,
);

interface ListSliderProps {
  name: Maybe<string> | undefined;
  total: Maybe<number> | undefined;
  value: Maybe<number> | undefined;
}

export default function ListSlider(props: ListSliderProps) {
  const { name, total, value } = props;

  return (
    <ListSliderBox>
      <ListSliderContain>
        <ListSliderWrapper>
          <Typography
            sx={{ color: '#25a56a', width: '200px', marginRight: '100px' }}
          >
            NAME : {name}
          </Typography>
          <Typography
            sx={{ color: '#8051d4', width: '200px', marginRight: '100px' }}
          >
            TOTAL : {total}
          </Typography>
          <Typography
            sx={{ color: '#eb5757', width: '200px', marginRight: '100px' }}
          >
            VALUE: {value ? `$${Number(value).toLocaleString()} USD` : '___'}
          </Typography>
          <Typography
            sx={{ color: '#25a56a', width: '200px', marginRight: '100px' }}
          >
            NAME : {name}
          </Typography>
          <Typography
            sx={{ color: '#8051d4', width: '200px', marginRight: '100px' }}
          >
            TOTAL : {total}
          </Typography>
          <Typography
            sx={{ color: '#eb5757', width: '200px', marginRight: '100px' }}
          >
            VALUE: {value ? `$${Number(value).toLocaleString()} USD` : '___'}
          </Typography>
          <Typography
            sx={{ color: '#25a56a', width: '200px', marginRight: '100px' }}
          >
            NAME : {name}
          </Typography>
          <Typography
            sx={{ color: '#8051d4', width: '200px', marginRight: '100px' }}
          >
            TOTAL : {total}
          </Typography>
          <Typography
            sx={{ color: '#eb5757', width: '200px', marginRight: '100px' }}
          >
            VALUE: {value ? `$${Number(value).toLocaleString()} USD` : '___'}
          </Typography>
          <Typography
            sx={{ color: '#25a56a', width: '200px', marginRight: '100px' }}
          >
            NAME : {name}
          </Typography>
          <Typography
            sx={{ color: '#8051d4', width: '200px', marginRight: '100px' }}
          >
            TOTAL : {total}
          </Typography>
          <Typography
            sx={{ color: '#eb5757', width: '200px', marginRight: '100px' }}
          >
            VALUE: {value ? `$${Number(value).toLocaleString()} USD` : '___'}
          </Typography>
        </ListSliderWrapper>
      </ListSliderContain>
    </ListSliderBox>
  );
}

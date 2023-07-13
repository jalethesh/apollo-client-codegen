import React, { useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

import CustomTooltip from './CustomTooltip';

import { ChartData } from '../../types/Models';

interface PriceChartProps {
  data: ChartData[];
  width?: string;
  height?: string;
}

export default function PriceChart(props: PriceChartProps) {
  const { data, width, height } = props;

  const [isIncrease, setIsIncrease] = useState<boolean>(true);

  useEffect(() => {
    setIsIncrease(data[0].price < data[data.length - 1].price);
  }, [data]);

  return (
    <Box sx={{ width: width ? width : '100%', height: height ? 300 : '100%' }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUvInc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="60.43%" stopColor="#00be4c" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#00be4c" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUvDec" x1="0" y1="0" x2="0" y2="1">
              <stop offset="60.43%" stopColor="#BE0000" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#BE0000" stopOpacity={0} />
            </linearGradient>
          </defs>
          {!width && <Tooltip content={<CustomTooltip />} />}
          <Area
            type="monotone"
            dataKey="y_position"
            stroke={isIncrease ? '#00be4c' : '#BE0000'}
            fill={isIncrease ? 'url(#colorUvInc)' : 'url(#colorUvDec)'}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}

interface valueFormatterProps {
  value: number;
  decimal?: number;
  type?: string;
}

export const valueFormatter = (props: valueFormatterProps) => {
  const { value, decimal, type } = props;
  if (decimal) {
    return;
  }
  if (type === 'observer') {
    return `${Number(value?.toFixed(2)).toLocaleString()}`;
  }
  if (type === 'current') {
    return `$ ${Number(value?.toFixed(2)).toLocaleString()}`;
  } else return `$ ${Number(value?.toFixed(2)).toLocaleString()} USD`;
};

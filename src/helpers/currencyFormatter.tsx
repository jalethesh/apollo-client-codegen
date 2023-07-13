interface currencyProps {
  value: number;
  type?: string;
}

export const currencyFormatter = (props: currencyProps) => {
  const { value, type } = props;

  let result;

  switch (type) {
    case 'EUR':
      result = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
      break;
    default:
      result = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
  }
  return result;
};

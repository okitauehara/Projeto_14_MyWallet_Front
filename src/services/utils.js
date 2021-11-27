const calcBalance = (transactions) => {
  const balance = transactions.reduce((total, event) => (event.type === 'earning' ? total + event.value : total - event.value), 0);
  return balance;
};

const formatCurrency = (value) => {
  const formatValue = (value / 100).toFixed(2).replace('.', ',');
  return formatValue;
};

export {
  calcBalance,
  formatCurrency,
};

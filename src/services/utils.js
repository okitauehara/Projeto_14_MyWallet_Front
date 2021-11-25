const calcBalance = (transactions) => {
  let balance = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === 'earning') {
      balance += transaction.value;
    } else {
      balance -= transaction.value;
    }
  });
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

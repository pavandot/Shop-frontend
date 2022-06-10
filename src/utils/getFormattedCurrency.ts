const currencyFormatter = new Intl.NumberFormat('en-IN');

export const getFormattedCurrency = (amount: number) => currencyFormatter.format(amount);

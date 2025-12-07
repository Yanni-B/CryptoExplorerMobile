export type CryptoDetailParams = {
  id: string;
  name: string;
  symbol: string;
  current_price?: number;
};

export type MarketChartResponse = {
  prices: [number, number][];
};

import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { useAxios } from '../hooks/useAxios';

import { CryptoHeader } from '../components/CryptoHeader';
import { CryptoChart } from '../components/CryptoChart';
import { CryptoMeta } from '../components/CryptoMeta';
import { CryptoStats } from '../components/CryptoStats';
import { CryptoDescription } from '../components/CryptoDescription';
import { CryptoLinks } from '../components/CryptoLinks';

type CryptoDetailParams = {
  id: string;
  name: string;
  symbol: string;
  current_price?: number;
};

type CryptoDetailRouteProp = RouteProp<
  { CryptoDetail: CryptoDetailParams },
  'CryptoDetail'
>;

type MarketChartResponse = {
  prices: [number, number][];
};

export default function CryptoDetailScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const route = useRoute<CryptoDetailRouteProp>();
  const { id, name, symbol, current_price } = route.params;

  const [days, setDays] = useState("30");

  const { data, loading, error, refetch } = useAxios<MarketChartResponse>(
    `/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
    true,
    1500
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <CryptoHeader
          id={id}
          name={name}
          symbol={symbol}
          current_price={current_price}
        />

        {/* CHART */}
        <CryptoChart id={id} />


        {/* META (price 24h, % changes, etc.) */}
        <CryptoMeta id={id} />

        {/* STATISTIQUES */}
        <CryptoStats id={id} />

        {/* DESCRIPTION */}
        <CryptoDescription id={id} />

        {/* LINKS */}
        <CryptoLinks id={id} />

        <View style={styles.bottomSpacing} />

      </ScrollView>
    </SafeAreaView>
  );
}

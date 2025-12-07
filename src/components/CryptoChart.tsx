import React, { useMemo, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { useAxios } from '../hooks/useAxios';

interface MarketChartResponse {
  prices: [number, number][];
}

interface Props {
  id: string;
}

export const CryptoChart = ({ id }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [days, setDays] = useState("30");

  const { data, loading, error, refetch } = useAxios<MarketChartResponse>(
    `/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
    true,
    2500
  );

  // Calcul des barres, min, max et tendance
  const { bars, min, max, trendUp } = useMemo(() => {
    const priceList = (data?.prices ?? []).map(p => p[1]);
    if (priceList.length === 0) {
      return { bars: [] as { h: number }[], min: 0, max: 0, trendUp: true };
    }

    const min = Math.min(...priceList);
    const max = Math.max(...priceList);
    const range = Math.max(1, max - min);
    const normalized = priceList.map(v => (v - min) / range);
    const usableHeight = 96;

    const bars = normalized.map(n => ({ h: Math.max(2, Math.round(n * usableHeight)) }));
    const trendUp = priceList[priceList.length - 1] >= priceList[0];

    return { bars, min, max, trendUp };
  }, [data]);

  // Options de period
  const periods = [
    { label: "1j", value: "1" },
    { label: "7j", value: "7" },
    { label: "30j", value: "30" },
    { label: "90j", value: "90" },
    { label: "1a", value: "365" },
  ];

  return (
    <View style={styles.section}>

      {/* Selecteur de periode */}
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        {periods.map((p) => (
          <TouchableOpacity
            key={p.value}
            onPress={() => setDays(p.value)}
            style={[
              styles.periodButton,
              days === p.value && styles.periodButtonActive
            ]}
          >
            <Text style={{ color: days === p.value ? "#fff" : theme.text }}>
              {p.label}
            </Text>
          </TouchableOpacity>

        ))}
      </View>

      {/* Header du graphique */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Historique {days} jours</Text>
        <Text style={styles.cryptoSymbolText}>USD</Text>
      </View>

      <View style={styles.chartContainer}>
        {loading ? (
          <View style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator color={theme.primary} />
            <Text style={styles.cryptoSymbolText}>Chargement…</Text>
          </View>
        ) : error ? (
          <View style={{ alignItems: 'center', paddingVertical: 8 }}>
            <Text style={styles.negativeChange}>Erreur: {error}</Text>
            <Text onPress={refetch} style={styles.seeAllText}>Réessayer</Text>
          </View>
        ) : bars.length === 0 ? (
          <Text style={styles.cryptoSymbolText}>Pas de données</Text>
        ) : (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={styles.cryptoSymbolText}>Min: ${min.toFixed(2)}</Text>
              <Text style={styles.cryptoSymbolText}>Max: ${max.toFixed(2)}</Text>
            </View>

            <View style={styles.chartBars}>
              {bars.map((b, idx) => (
                <View
                  key={idx}
                  style={{
                    width: 3,
                    height: b.h,
                    marginRight: 2,
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                    backgroundColor: trendUp
                      ? (styles.positiveChange.color as string)
                      : (styles.negativeChange.color as string),
                  }}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { useAxios } from '../hooks/useAxios';

interface Props { id: string }

export const CryptoStats = ({ id }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { data } = useAxios<any>(
    `/coins/${id}?localization=false`,
    true,
    2500
  );

  if (!data) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Statistiques</Text>

      <View style={styles.rowBetween}>
        <Text style={styles.textSecondary}>Capitalisation boursière</Text>
        <Text style={styles.text}>${data.market_data.market_cap.usd.toLocaleString()}</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.textSecondary}>Volume sur 24h</Text>
        <Text style={styles.text}>${data.market_data.total_volume.usd.toLocaleString()}</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.textSecondary}>Rang</Text>
        <Text style={styles.text}>#{data.market_cap_rank}</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.textSecondary}>Quantité en circulation</Text>
        <Text style={styles.text}>
          {data.market_data.circulating_supply.toLocaleString()} {data.symbol.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

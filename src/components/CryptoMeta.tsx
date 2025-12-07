import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { useAxios } from '../hooks/useAxios';

interface Props {
  id: string;
}

export const CryptoMeta = ({ id }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { data, loading } = useAxios<any>(
    `/coins/${id}?localization=false`,
    true,
    2500
  );

  if (loading || !data) return null;

  const meta = data;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Informations générales</Text>

      <View style={styles.rowBetween}>
        <Text style={styles.textSecondary}>Symbole</Text>
        <Text style={styles.text}>{meta.symbol.toUpperCase()}</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.textSecondary}>Type</Text>
        <Text style={styles.text}>
          {meta.asset_platform_id ? 'Token' : 'Coin'}
        </Text>
      </View>

      {meta.asset_platform_id && (
        <View style={styles.rowBetween}>
          <Text style={styles.textSecondary}>Plateforme</Text>
          <Text style={styles.text}>{meta.asset_platform_id}</Text>
        </View>
      )}

      <View style={styles.rowBetween}>
        <Text style={styles.textSecondary}>Catégories</Text>
        <Text style={[styles.text, { maxWidth: '60%', textAlign: 'right' }]}>
          {meta.categories.slice(0, 2).join(', ')}
        </Text>
      </View>

      {meta.genesis_date && (
        <View style={styles.rowBetween}>
          <Text style={styles.textSecondary}>Date de création</Text>
          <Text style={styles.text}>{meta.genesis_date}</Text>
        </View>
      )}
    </View>
  );
};

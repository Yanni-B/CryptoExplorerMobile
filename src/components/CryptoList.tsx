import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, LayoutChangeEvent } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface Props {
  data?: Coin[];
  loading: boolean;
  error?: string | null;
  navigation: any;
  currency?: string;
}

export const CryptoList = ({ data, loading, error, navigation, }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [contentHeight, setContentHeight] = useState(0);
  const [showSeeAll, setShowSeeAll] = useState(false);

  useEffect(() => {
    if (contentHeight > 100) setShowSeeAll(true);
    else setShowSeeAll(false);
  }, [contentHeight]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  return (
    <View style={styles.section} onLayout={onLayout}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Cryptos populaires</Text>
      </View>

      {loading && <ActivityIndicator size="large" color={theme.primary} />}
      {error && <Text style={{ color: 'red' }}>Erreur : {error}</Text>}

      {data && (
        <View style={styles.cryptoList}>
          {data.map((crypto) => (
            <View key={crypto.id} style={styles.cryptoCard}>
              <View style={styles.cryptoInfo}>
                <View style={styles.cryptoIcon}>
                  <Text style={styles.cryptoSymbol}>
                    {crypto.symbol[0].toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text style={styles.cryptoName}>{crypto.name}</Text>
                  <Text style={styles.cryptoSymbolText}>
                    {crypto.symbol.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.cryptoPrice}>
                <Text style={styles.cryptoPriceText}>
                  ${crypto.current_price.toLocaleString('en-US')}
                </Text>
                <Text
                  style={[
                    styles.cryptoChange,
                    crypto.price_change_percentage_24h >= 0
                      ? styles.positiveChange
                      : styles.negativeChange,
                  ]}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {showSeeAll && (
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('ListCrypto')}
        >
          <Text style={styles.ctaButtonText}>Voir toutes les cryptomonnaies</Text>
          <Text style={styles.ctaButtonIcon}>→</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
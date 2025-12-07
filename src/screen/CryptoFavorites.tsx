import React, { useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { useAuth } from '../auth/AuthContext';
import { useAxios } from '../hooks/useAxios';
import { useNavigation } from '@react-navigation/native';
import { ref } from 'process';

export default function CryptoFavorites() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { favorites } = useAuth();
  const navigation = useNavigation<any>();

  const ids = useMemo(() => favorites.join(','), [favorites]);
  const { data, refetch } = useAxios<any[]>(ids ? `/coins/markets?vs_currency=usd&ids=${ids}` : '', false, 1000);

  useEffect(() => {
    if (ids) {
      refetch();
    }
  }, [ids]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes Favoris</Text>
        </View>
        <View style={styles.section}>
          {!favorites.length && (
            <Text style={styles.cryptoSymbolText}>
              Aucun favori pour l'instant.
            </Text>
          )}
          {favorites.length > 0 && data?.map((coin) => (
            <TouchableOpacity
              key={coin.id}
              style={styles.cryptoCard}
              onPress={() => navigation.navigate('CryptoDetail', {
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                current_price: coin.current_price,
              })}
            >
              <View style={styles.cryptoInfo}>
                <View style={styles.cryptoIcon} />
                <View>
                  <Text style={styles.cryptoName}>{coin.name}</Text>
                  <Text style={styles.cryptoSymbolText}>{coin.symbol.toUpperCase()}</Text>
                </View>
              </View>
              <View style={styles.cryptoPrice}>
                <Text style={styles.cryptoPriceText}>${coin.current_price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

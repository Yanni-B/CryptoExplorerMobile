import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataTable } from 'react-native-paper';
import { useAxios } from '../hooks/useAxios';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
}

export default function ListCrypto() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();

  const [page, setPage] = useState(1); // Page actuelle pour la pagination
  const itemsPerPage = 20; // Nombre de cryptos par page

  // Récupération des données depuis l'API
  const { data, loading, error, refetch } = useAxios<Coin[]>(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsPerPage}&page=${page}`,
    false,
    2500
  );

  // Re-fetch à chaque changement de page
  useEffect(() => {
    refetch();
  }, [page]);

  // Fonction pour formater la capitalisation 
  const formatMarketCap = (value: number) => {
    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + 'B';
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + 'M';
    if (value >= 1_000) return (value / 1_000).toFixed(2) + 'K';
    return value.toString();
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ color: theme.text, marginTop: 8 }}>Chargement...</Text>
      </View>
    );
  }

  // Affichage de l'erreur si l'API a échoué
  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 16 }]}>
        <Text style={{ color: 'red', marginBottom: 16 }}>Erreur : {error}</Text>
        <Button title="Réessayer" onPress={refetch} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Button title="Rafraîchir" color={theme.primary} onPress={refetch} />

        {/* Tableau des cryptos */}
        <DataTable style={{ marginTop: 16, borderRadius: 8, overflow: 'hidden' }}>
          <DataTable.Header style={{ backgroundColor: theme.card }}>
            <DataTable.Title style={{ flex: 2 }}>
              <Text style={{ color: theme.text, fontWeight: 'bold' }}>Nom</Text>
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontWeight: 'bold' }}>Code</Text>
            </DataTable.Title>
            <DataTable.Title numeric style={{ flex: 2 }}>
              <Text style={{ color: theme.text, fontWeight: 'bold' }}>Prix (USD)</Text>
            </DataTable.Title>
            <DataTable.Title numeric style={{ flex: 2 }}>
              <Text style={{ color: theme.text, fontWeight: 'bold' }}>Capitalisation</Text>
            </DataTable.Title>
          </DataTable.Header>

          {data?.map((coin, index) => (
            <DataTable.Row
              key={coin.id}
              style={{ backgroundColor: index % 2 === 0 ? theme.card : theme.background }}
              onPress={() =>
                navigation.navigate('CryptoDetail', {
                  id: coin.id,
                  name: coin.name,
                  symbol: coin.symbol,
                  current_price: coin.current_price,
                })
              }
            >
              <DataTable.Cell style={{ flex: 2 }}>
                <Text style={{ color: theme.text }}>{coin.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>
                <Text style={{ color: theme.text }}>{coin.symbol.toUpperCase()}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 2, paddingRight: 8 }}>
                <Text style={{ color: theme.text }}>${coin.current_price.toFixed(2)}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 2 }}>
                <Text style={{ color: theme.text }}>{formatMarketCap(coin.market_cap)}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          {/* Pagination */}
          <DataTable.Pagination
            page={page - 1}
            numberOfPages={10}
            onPageChange={(newPage) => setPage(newPage + 1)}
            label={`Page ${page}`}
            showFastPaginationControls
          />
        </DataTable>
      </ScrollView>
    </SafeAreaView>
  );
}
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';

interface Props {
  id: string;
  name: string;
  symbol: string;
  current_price?: number;
}

export const CryptoHeader = ({ id, name, symbol, current_price }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user, favorites, addFavorite, removeFavorite } = useAuth();
  const isFavorite = !!favorites?.includes(id);

  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>
        Bienvenue à Crypto Tracker
      </Text>

      {/* Détails de la crypto */}
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
        {name} ({symbol.toUpperCase()})
      </Text>

      {typeof current_price === 'number' && (
        <Text style={styles.cryptoPriceText}>
          ${current_price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      )}

      {/* Bouton favoris */}
      {user && (
        <TouchableOpacity
          style={[styles.button, { alignSelf: 'flex-start', marginTop: 8 }]}
          onPress={() => (isFavorite ? removeFavorite(id) : addFavorite(id))}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

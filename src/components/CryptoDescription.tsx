import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { useAxios } from '../hooks/useAxios';

interface Props {
  id: string;
}

export const CryptoDescription = ({ id }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [expanded, setExpanded] = useState(false);

  const { data, loading } = useAxios<any>(
    `/coins/${id}?localization=false`,
    true,
    2500
  );

  if (loading || !data) return null;

  const desc = data.description?.en || '';

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>À propos</Text>

      <Text
        numberOfLines={expanded ? undefined : 4}
        style={styles.text}
      >
        {desc.replace(/<\/?[^>]+(>|$)/g, '')}
      </Text>

      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.linkText}>
          {expanded ? 'Afficher moins' : 'Lire plus'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

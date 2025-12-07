import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { useAxios } from '../hooks/useAxios';

interface Props { id: string }

export const CryptoLinks: React.FC<Props> = ({ id }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { data } = useAxios<any>(
    `/coins/${id}?localization=false`,
    true,
    2500
  );

  if (!data) return null;

  const links = data.links;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Links</Text>

      <TouchableOpacity onPress={() => Linking.openURL(links.homepage[0])}>
        <Text style={styles.linkText}>Website</Text>
      </TouchableOpacity>

      {links.repos_url.github[0] && (
        <TouchableOpacity onPress={() => Linking.openURL(links.repos_url.github[0])}>
          <Text style={styles.linkText}>GitHub</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => Linking.openURL(links.blockchain_site[0])}>
        <Text style={styles.linkText}>Block Explorer</Text>
      </TouchableOpacity>
    </View>
  );
};

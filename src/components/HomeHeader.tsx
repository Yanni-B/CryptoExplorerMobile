import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { useAuth } from '../auth/AuthContext';

interface Props {
  currentTime: string;
}

export const HomeHeader = ({ currentTime }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useAuth();

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Bonjour, {user?.name ?? ''} 👋 </Text>
        <Text style={styles.title}>Bienvenu à Crypto Tracker</Text>
        <Text style={{ marginTop: 4, fontSize: 14, color: theme.secondary }}>
          {currentTime}
        </Text>
      </View>
    </View>
  );
};

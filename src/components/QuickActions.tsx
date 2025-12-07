import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Tabs'>;
}

export const QuickActions = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Actions rapides</Text>
      <View style={styles.quickActionsGrid}>
        
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('ListCrypto')}
        >
          <FontAwesome5 name="coins" size={24} color={theme.primary} />
          <Text style={styles.actionTitle}>ListCrypto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Ionicons name="star" size={24} color={theme.primary} />
          <Text style={styles.actionTitle}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Profile')}
        >
          <MaterialIcons name="person" size={24} color={theme.primary} />
          <Text style={styles.actionTitle}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-sharp" size={24} color={theme.primary} />
          <Text style={styles.actionTitle}>Settings</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

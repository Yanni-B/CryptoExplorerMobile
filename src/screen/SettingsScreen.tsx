import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { useAuth } from '../auth/AuthContext';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const styles = createStyles(theme);
  const { logout, clearFavorites } = useAuth();

  const actions = [
    { icon: <MaterialIcons name="brightness-6" size={28} color={theme.primary} />, title: 'Changer le thème', onPress: toggleTheme },
    { icon: <Ionicons name="notifications-outline" size={28} color={theme.primary} />, title: 'Notifications', onPress: () => alert('À venir') },
    { icon: <FontAwesome5 name="coins" size={28} color={theme.primary} />, title: 'Devise', onPress: () => alert('We only support USD') },
    { icon: <MaterialIcons name="favorite-border" size={28} color={theme.primary} />, title: 'Réinitialiser favoris', onPress: clearFavorites },
    { icon: <Ionicons name="information-circle-outline" size={28} color={theme.primary} />, title: 'À propos', onPress: () => alert('Crypto Tracker v1.0') },
    { icon: <MaterialIcons name="logout" size={28} color={theme.primary} />, title: 'Se déconnecter', onPress: logout },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={[styles.title, { marginBottom: 16 }]}>Paramètres</Text>

        <View style={styles.quickActionsGrid}>
          {actions.map((action, idx) => (
            <TouchableOpacity key={idx} style={styles.actionCard} onPress={action.onPress}>
              {action.icon}
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

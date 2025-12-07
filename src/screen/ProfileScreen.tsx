import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { useAuth } from '../auth/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();

  async function onLogout() {
    await logout();
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mon Profil</Text>
      </View>
      <View style={styles.section}>
        {user ? (
          <>
            <Text style={styles.cryptoName}>{user.name}</Text>
            <Text style={styles.cryptoSymbolText}>{user.email}</Text>
          </>
        ) : (
          <Text style={styles.cryptoSymbolText}>Non connecté</Text>
        )}
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={onLogout} style={styles.button}>
          <Text style={styles.buttonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSpacing} />
    </SafeAreaView>
  );
}
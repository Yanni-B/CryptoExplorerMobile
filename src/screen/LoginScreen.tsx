import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/styleSheet';
import { useAuth } from '../auth/AuthContext';

export default function LoginScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  async function onSubmit() {
    try {
      setError(null);
      await login(email.trim(), password);
    } catch (e: any) {
      setError(e?.message || e?.response?.data?.message || 'Erreur de connexion');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connexion</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.cryptoSymbolText}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="email"
          placeholderTextColor={theme.secondary}
          style={{ backgroundColor: theme.card, color: theme.text, borderRadius: 8, padding: 12, marginBottom: 12 }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.cryptoSymbolText}>Mot de passe</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="mot de passe"
          placeholderTextColor={theme.secondary}
          style={{ backgroundColor: theme.card, color: theme.text, borderRadius: 8, padding: 12, marginBottom: 12 }}
          secureTextEntry
        />
        {error && <Text style={styles.negativeChange}>{error}</Text>}
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.cryptoSymbolText}>Pas de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.seeAllText}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSpacing} />
    </SafeAreaView>
  );
}

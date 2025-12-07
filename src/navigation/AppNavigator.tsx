import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../auth/AuthContext';

// Screens
import HomeScreen from '../screen/HomeScreen';
import ListCrypto from '../screen/ListCrypto';
import CryptoDetailScreen from '../screen/CryptoDetailScreen';
import SettingsScreen from '../screen/SettingsScreen';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import CryptoFavorites from '../screen/CryptoFavorites';
import ProfileScreen from '../screen/ProfileScreen';

// --- Typage des navigateurs ---
export type RootStackParamList = {
  Tabs: undefined;
  CryptoDetail: { id: string; name: string; symbol: string; current_price?: number; };
  Login: undefined;
  Register: undefined;
  ListCrypto: undefined;
  Favorites: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Home: undefined;
  ListCrypto: undefined;
  Favorites: undefined;
  Profile: undefined;
  Settings: undefined;
};

// --- Création des navigateurs ---
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// --- Bottom Tabs ---
function Tabs() {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.card },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondary,
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
          switch (route.name) {
            case 'Home': iconName = 'home'; break;
            case 'ListCrypto': iconName = 'currency-btc'; break;
            case 'Favorites': iconName = 'star'; break;
            case 'Profile': iconName = 'account'; break;
            case 'Settings': iconName = 'cog'; break;
            default: iconName = 'circle'; break;
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {user ? (
        <>
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
          <Tab.Screen name="ListCrypto" component={ListCrypto} options={{ title: 'Cryptos' }} />
          <Tab.Screen name="Favorites" component={CryptoFavorites} options={{ title: 'Favoris' }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
          <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Paramètres' }} />
        </>
      ) : (
        <Tab.Screen name="Home" component={LoginScreen} options={{ title: 'Connexion' }} />
      )}
    </Tab.Navigator>
  );
}

// --- App Navigator (Stack principal) ---
export default function AppNavigator() {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tabs comme écran principal */}
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />

        {/* Détail Crypto accessible depuis ListCrypto */}
        {user && (
          <Stack.Screen
            name="CryptoDetail"
            component={CryptoDetailScreen}
            options={{
              title: 'Détail Crypto',
              headerStyle: { backgroundColor: theme.background },
              headerTintColor: theme.text,
            }}
          />
        )}

        {/* Écrans de login / register si non connecté */}
        {!user && (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Connexion' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Créer un compte' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAxios } from "../hooks/useAxios";
import { useTheme } from "../theme/ThemeContext";
import { createStyles } from "../styles/styleSheet";
import { HomeHeader } from "../components/HomeHeader";
import { QuickActions } from "../components/QuickActions";
import { CryptoList } from "../components/CryptoList";
import { useCurrency } from "../hooks/useCurrency";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Tabs">;
};

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function HomeScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { currency, loading: currencyLoading } = useCurrency();

  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted =
        `${now.getDate().toString().padStart(2, "0")}/` +
        `${(now.getMonth() + 1).toString().padStart(2, "0")}/` +
        `${now.getFullYear()} - ` +
        `${now.getHours().toString().padStart(2, "0")}:` +
        `${now.getMinutes().toString().padStart(2, "0")}:` +
        `${now.getSeconds().toString().padStart(2, "0")}`;
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { data, loading, error, refetch } = useAxios<Coin[]>(
    `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=3&page=1`,
    false
  );

  useEffect(() => {
    refetch();
  }, [currency]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader currentTime={currentTime} />
        <QuickActions navigation={navigation} />
        <CryptoList
          data={data ?? undefined}
          loading={loading || currencyLoading}
          error={error ?? undefined}
          navigation={navigation}
          currency={currency}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
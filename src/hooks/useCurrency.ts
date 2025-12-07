import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useCurrency() {
  const [currency, setCurrency] = useState<string>("usd");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission location refusée");
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        const countryCode = reverseGeocode[0]?.isoCountryCode || "US";

        const map: Record<string, string> = {
          CA: "cad",
          US: "usd",
          FR: "eur",
        };

        setCurrency(map[countryCode] || "usd");
      } catch (e) {
        console.log("Erreur useCurrency:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { currency, loading };
}

// hooks/useAyahData.ts (with Async Storage)
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useAyahData = (ayahNumber: number | null) => {
  const [ayahData, setAyahData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAyahData = async () => {
      if (ayahNumber !== null) {
        setLoading(true);

        try {
          const cachedData = await AsyncStorage.getItem(`ayah-${ayahNumber}`);
          if (cachedData) {
            setAyahData(JSON.parse(cachedData));
          } else {
            const response = await axios.get(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/en.asad`);
            const ayah = response.data.data;
            setAyahData(ayah);
            await AsyncStorage.setItem(`ayah-${ayahNumber}`, JSON.stringify(ayah));
          }
        } catch (err) {
          setError('Failed to fetch Ayah data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAyahData();
  }, [ayahNumber]);

  return { ayahData, loading, error };
};

export default useAyahData;

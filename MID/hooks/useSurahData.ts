// hooks/useSurahData.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SURAH_API_URL = 'https://api.alquran.cloud/v1/surah';

const useSurahData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem('surahData');
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false);
        }

        const response = await axios.get(SURAH_API_URL);
        const fetchedData = response.data.data;
        setData(fetchedData);
        await AsyncStorage.setItem('surahData', JSON.stringify(fetchedData));
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useSurahData;

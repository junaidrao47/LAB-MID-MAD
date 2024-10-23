// hooks/useQuranData.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const useQuranData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/quran/en.asad');
        setData(response.data.data.surahs); // Storing all surahs
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Quran data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useQuranData;

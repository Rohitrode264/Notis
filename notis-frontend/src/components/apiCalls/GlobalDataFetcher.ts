import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { BASE_URL } from '../../config/config';
import { globalDataAtom } from '../../recoil/atoms/globalDataAtom';

export const GlobalDataFetcher = () => {
  const setGlobalData = useSetRecoilState(globalDataAtom);

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/NewsBatchForGlobe`);
      const data = await res.json();
      setGlobalData(data);
    } catch (error) {
      console.error('Error fetching Global data:', error);
    }
  };

  useEffect(() => {
    fetchData(); 

    const intervalId = setInterval(() => {
      fetchData();
    }, 30 * 60 * 1000);

    return () => clearInterval(intervalId); 
  }, [setGlobalData]);

  return null; 
};

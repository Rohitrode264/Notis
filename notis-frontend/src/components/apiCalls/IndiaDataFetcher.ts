import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { indiaDataAtom } from '../../recoil/atoms/indiaDataAtom';
import { BASE_URL } from '../../config/config';

export const IndiaDataFetcher = () => {
  const setIndiaData = useSetRecoilState(indiaDataAtom);

  const fetchData = async () => {
    try {
        const res = await fetch(`${BASE_URL}/NewsBatchForIndia`);
        const data = await res.json();
        setIndiaData(data);
    } catch (error) {
      console.error('Error fetching India data:', error);
    }
  };

  useEffect(() => {
    fetchData(); 

    const intervalId = setInterval(() => {
      fetchData();
    }, 30 * 60 * 1000);

    return () => clearInterval(intervalId); 
  }, [setIndiaData]);

  return null; 
};

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { BASE_URL } from '../../config/config';
import { currentAffairsDataAtom } from '../../recoil/atoms/currentAffairsDataAtom';

export const CaDataFetcher = () => {
  const setCaData = useSetRecoilState(currentAffairsDataAtom);

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/NewsBatchOfCA`);
      const data = await res.json();
      setCaData(data);
    } catch (error) {
      console.error('Error fetching Ca data:', error);
    }
  };

  useEffect(() => {
    fetchData(); 

    const intervalId = setInterval(() => {
      fetchData();
    }, 30 * 60 * 1000);

    return () => clearInterval(intervalId); 
  }, [setCaData]);

  return null; // Or a loading spinner
};

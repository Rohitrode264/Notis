import { useRecoilValue } from 'recoil';
import { indiaDataAtom, type DataItem } from '../../recoil/atoms/indiaDataAtom';
import { NewsDropdown } from '../cards/newCard';
import { globalDataAtom } from '../../recoil/atoms/globalDataAtom';
import { div } from 'framer-motion/client';
import { currentAffairsDataAtom } from '../../recoil/atoms/currentAffairsDataAtom';



export const IndiaDataRenderer = () => {
    const indiaData: DataItem[] = useRecoilValue(indiaDataAtom);


    return (
        <div>
            {indiaData.map((item) => (
                <div key={item.title}>
                    <NewsDropdown {...item} />
                </div>
            ))}
        </div>
    );
};

export const GlobalDataRender = () => {
    const globalData: DataItem[] = useRecoilValue(globalDataAtom);

    return (
        <div>
            {globalData.map((item) => (
                <div key={item.title}>
                    <NewsDropdown {...item} />
                </div>
            ))}
        </div>
    )
}

export const CaDataRender = () => {
    const CaData: DataItem[] = useRecoilValue(currentAffairsDataAtom);

    return (
        <div>
            {CaData.map((item) => (
                <div key={item.title}>
                    <NewsDropdown {...item} />
                </div>
            ))}
        </div>
    )
}
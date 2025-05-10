import { atom } from 'recoil';

export interface DataItem {
  title: string;
  summary: string;
  url: string;
  source: string;
}

export const indiaDataAtom = atom<DataItem[]>({
  key: 'indiaDataAtom',
  default: [],
});
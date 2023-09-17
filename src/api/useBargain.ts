import {Bargain} from '../model/bargain';

import customAxios from './customAxios';

export const getBarginList = async ({
  menuId,
}: {
  menuId: string;
}): Promise<Bargain[] | undefined> => {
  const url = `/api/bargain/list/${menuId}`;
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }

  const {data} = await fetcher.get(url);
  return data;
};

export const acceptProposal = async ({
  menuId,
  userId,
}: {
  menuId: string;
  userId: string;
}) => {
  const url = '/api/bargain/accept';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }

  const {data} = await fetcher.post(url, {menuId, userId});
  return data;
};

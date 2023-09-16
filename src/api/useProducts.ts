import {Product} from '../model/product';
import customAxios from './customAxios';

type GetProductsProps = {
  userId: string;
  isBargain: string;
};

export const getProducts = async ({
  userId,
  isBargain,
}: GetProductsProps): Promise<Product[] | undefined> => {
  const url = '/api/menu/get/store';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }

  const {data} = await fetcher.post(url, {userId, isBargain});
  console.log(data);
  return data;
};

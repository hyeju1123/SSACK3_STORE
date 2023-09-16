import React, {useCallback, useEffect, useState} from 'react';

import Header from './Header';
import RemainedProducts from './RemainedProducts';
import {StatusBar} from 'react-native';
import {useUser} from '../context/AuthContext';
import {getProducts} from '../api/useProducts';
import {Product} from '../model/product';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../navigation/HomeStack';

export type OptionType = {
  show: boolean;
  bargain: boolean;
};

type MainPageProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function MainPage({navigation}: MainPageProps): JSX.Element {
  const [option, setOption] = useState<OptionType>({
    show: false,
    bargain: false,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const {userId} = useUser();

  const fetchProducts = useCallback(async () => {
    const res = await getProducts({
      userId: userId,
      isBargain: option.bargain ? 'T' : 'F',
    });
    if (res) {
      setProducts(res);
      console.log('res in main:: ', res);
    }
  }, [option.bargain, userId]);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', fetchProducts);

    return () => {
      unsubscribeFocus();
    };
  }, [userId, option.bargain, navigation, fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [userId, option.bargain, fetchProducts]);

  return (
    <>
      <StatusBar backgroundColor="#94E048" />
      <Header option={option} setOption={setOption} />
      <RemainedProducts products={products} />
    </>
  );
}

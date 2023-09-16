import React from 'react';

import Header from './Header';
import RemainedProducts from './RemainedProducts';
import {StatusBar} from 'react-native';

export default function MainPage(): JSX.Element {
  return (
    <>
      <StatusBar backgroundColor="#94E048" />
      <Header />
      <RemainedProducts />
    </>
  );
}

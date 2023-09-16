import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from '../components/text';
import RemainedProductsCard from '../components/RemainedProductCard';
import {Product} from '../model/product';

type Props = {
  products: Product[];
};

export default function RemainedProducts({products}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.h1Text}>아직 팔리지 않은 상품이에요 👀</Text>
      <ScrollView style={styles.scrollViewStyle}>
        {products.map((product, index) => (
          <RemainedProductsCard key={index} product={product} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    padding: 15,
    backgroundColor: 'white',
  },
  h1Text: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: 'black',
  },
  scrollViewStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
});

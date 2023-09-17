import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text} from '../components/text';
import RemainedProductsCard from '../components/RemainedProductCard';
import {Product} from '../model/product';
import AiIcon from 'react-native-vector-icons/AntDesign';
import BargainCard from '../components/BargainCard';
import {getBarginList} from '../api/useBargain';

type Props = {
  products: Product[];
  fetchProducts: any;
};

export default function RemainedProducts({
  products,
  fetchProducts,
}: Props): JSX.Element {
  const [showState, setShowState] = useState(false);
  const [barginInfo, setBargainInfo] = useState({menuId: '0', data: []});

  const handleBarginCards = async (menuId: string) => {
    setShowState(true);
    const data = await getBarginList({menuId});
    console.log(data);
    setBargainInfo({menuId, data: [...data]});
  };
  return (
    <View style={styles.container}>
      {showState && (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text style={styles.headerText}>흥정 제안</Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowState(false)}
              style={styles.closeIcon}>
              <AiIcon name="close" size={15} color={'#FD8535'} />
            </TouchableOpacity>
            <ScrollView>
              <View style={styles.cardContainer}>
                {barginInfo.data.map((info, key) => (
                  <BargainCard
                    fetchProducts={fetchProducts}
                    menuId={barginInfo.menuId}
                    info={info}
                    key={key}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
      <Text style={styles.h1Text}>아직 팔리지 않은 상품이에요 👀</Text>
      <ScrollView style={styles.scrollViewStyle}>
        {products.map((product, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleBarginCards(product.menuId.toString())}>
            <RemainedProductsCard product={product} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const width = Dimensions.get('window').width;

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
  modalContainer: {
    width: width,
    height: '100%',
    position: 'absolute',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    maxHeight: 400,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 10,
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  headerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

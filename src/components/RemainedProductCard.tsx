import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from './text';

export default function RemainedProductsCard(): JSX.Element {
  return (
    <>
      <View style={styles.cardContainer}>
        <Image
          source={require('../../images/olaf.jpeg')}
          style={styles.foodImage}
        />
        <View style={styles.infoBox}>
          <View style={styles.foodInfoContainer}>
            <View style={styles.foodTitleBox}>
              <Text style={styles.foodTitleText}>파리바케뜨 런치 샌드위치</Text>
            </View>
          </View>

          <View style={styles.spaceBetweenBox}>
            <View style={styles.discountingLine} />
            <Text style={styles.discountedText}>￦ 5000</Text>
            <View style={styles.discountedRatioBox}>
              <Text style={styles.discountedRatioText}>40%</Text>
            </View>
            <View style={styles.bargainInfoBox}>
              <Text style={styles.barginInfoText}>흥정제안: 2명</Text>
            </View>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={styles.priceText}>￦ 3,200</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 3,
    marginVertical: 5,
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoBox: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 6,
    display: 'flex',
    justifyContent: 'space-between',
  },
  foodInfoContainer: {
    padding: 2,
  },
  foodTitleBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 3,
  },
  foodTitleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'black',
  },
  spaceBetweenBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 3,
  },
  discountingLine: {
    width: 40,
    left: 8,
    top: 13,
    transform: [{rotate: '-10deg'}],
    position: 'absolute',
    borderTopColor: '#FD8535',
    borderTopWidth: 3,
    zIndex: 5,
  },
  discountedText: {
    color: '#d9d9d9',
    fontFamily: 'Inter-SemiBold',
    fontSize: 8,
    paddingHorizontal: 10,
    marginBottom: 3,
  },
  priceWrapper: {
    alignSelf: 'flex-start',
    backgroundColor: '#94E048',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  priceText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
  },
  discountedRatioBox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#FD8535',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountedRatioText: {
    color: '#FD8535',
    fontFamily: 'Inter-SemiBold',
    fontSize: 4,
  },
  bargainInfoBox: {
    top: 28,
    flex: 1,
  },
  barginInfoText: {
    color: '#FD8535',
    fontFamily: 'Inter-Medium',
    fontSize: 8,
    textAlign: 'right',
  },
});

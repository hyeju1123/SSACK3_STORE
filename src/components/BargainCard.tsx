import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from './text';
import {Bargain} from '../model/bargain';
import {formatPrice} from '../service/calculator';
import {acceptProposal} from '../api/useBargain';

type Props = {
  menuId: string;
  info: Bargain;
  fetchProducts: any;
};

export default function BargainCard({info, menuId, fetchProducts}: Props) {
  const [toggle, setToggle] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const {transactionSuccessCount, bargainPrice, proposerNickname, userId} =
    info;

  const handleAcceptProposal = async () => {
    const res = await acceptProposal({
      menuId: menuId,
      userId: userId.toString(),
    });
    if (res === 1) {
      setShowSuccess(true);
      setTimeout(() => {
        setToggle(false);
      }, 2000);
      await fetchProducts();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowBox}>
        <Text style={styles.proposerText}>{proposerNickname}</Text>
        <View style={{marginLeft: -90}}>
          <Text style={styles.proposedText}>
            ￦{formatPrice(bargainPrice.toString())} 제안
          </Text>
          <Text style={styles.infoText}>
            거래 성사 횟수: {transactionSuccessCount}번
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setToggle(!toggle)}
          style={[styles.allowButton, toggle && {backgroundColor: '#696969'}]}>
          <Text style={styles.allowText}>수락하기</Text>
        </TouchableOpacity>
      </View>
      {toggle && (
        <View style={styles.toggleBox}>
          <Text style={styles.questionText}>
            {proposerNickname}님의 흥정을 정말 수락하실 건가요?
          </Text>
          <View style={[styles.rowBox, {width: '30%'}]}>
            <TouchableOpacity
              onPress={handleAcceptProposal}
              style={[styles.semiButton, {backgroundColor: '#94E048'}]}>
              <Text style={styles.semiText}>수락</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.semiButton, {backgroundColor: '#696969'}]}
              onPress={() => setToggle(false)}>
              <Text style={styles.semiText}>취소</Text>
            </TouchableOpacity>
          </View>
          {showSuccess && (
            <Text style={styles.successText}>흥정 수락이 완료되었습니다!</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
  },
  rowBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  proposerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: 'black',
  },
  proposedText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: 'black',
  },
  infoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 8,
    color: '#696969',
  },
  allowButton: {
    backgroundColor: '#94E048',
    borderRadius: 12,
    padding: 3,
    alignSelf: 'flex-start',
  },
  allowText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: 'white',
  },
  toggleBox: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
  },
  questionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 8,
    color: '#696969',
  },
  semiButton: {
    borderRadius: 8,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
  },
  semiText: {
    fontFamily: 'Inter-Medium',
    fontSize: 9,
    color: 'white',
  },
  successText: {
    fontFamily: 'Inter-Bold',
    fontSize: 8,
    color: '#94E048',
  },
});

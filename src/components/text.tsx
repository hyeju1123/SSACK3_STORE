import React from 'react';
import {
  Text as ReactText,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';

type TextProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  oneline?: boolean;
};

export const Text = ({style, children, oneline = false}: TextProps) => {
  return (
    <ReactText numberOfLines={oneline ? 1 : 0} style={[styles.font, style]}>
      {children}
    </ReactText>
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Inter-Regular',
  },
});

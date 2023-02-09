import React from 'react';
import {Text as ReactText, StyleSheet} from 'react-native';

export const Text = ({style, children, className}) => {
  return (
    <ReactText className={className} style={[styles.font, style]}>
      {children}
    </ReactText>
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Montserrat-Bold',
  },
});

import {Pressable, View, Text} from 'react-native';
import React from 'react';

const RippleButton = ({
  children,
  className,
  onPress,
  rippleColor,
  borderless,
  radius,
}) => {
  return (
    <Pressable
      className={className ? className : null}
      onPress={onPress ? onPress : null}
      android_ripple={{
        color: rippleColor ? rippleColor : '#ffffff30',
        borderless: borderless ? borderless : true,
        radius: radius ? radius : 100,
      }}>
      {children}
    </Pressable>
  );
};

export default RippleButton;

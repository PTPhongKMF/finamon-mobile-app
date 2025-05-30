import React, { useEffect } from 'react';
import { Animated, StyleSheet, Easing } from 'react-native';

interface SlideTransitionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
}

export default function SlideTransition({ children, direction = 'right' }: SlideTransitionProps) {
  const slideAnim = new Animated.Value(direction === 'right' ? 1000 : -1000);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
      easing: Easing.out(Easing.cubic)
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: slideAnim }]
        }
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A5237', // Using your darkest green color to match the gradient
  }
}); 
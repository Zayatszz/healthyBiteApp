// SkeletonCarWashItem.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Skeleton from './Skeleton';

const SkeletonFoodItem = () => {
  return (
    <View style={styles.container}>
      <Skeleton style={styles.image} />
      <Skeleton style={styles.title} />
      <Skeleton style={styles.description} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    // marginRight: 16,
    marginLeft: 20,
  },
  image: {
    height: 120,
    width: '100%',
    borderRadius: 10,
  },
  title: {
    height: 20,
    width: '80%',
    marginTop: 10,
    borderRadius: 4,
  },
  description: {
    height: 15,
    width: '60%',
    marginTop: 10,
    borderRadius: 4,
  },
});

export default SkeletonFoodItem;

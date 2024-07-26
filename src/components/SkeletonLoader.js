import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';

const SkeletonLoader = () => {
  return (
    <SkeletonContent
      containerStyle={styles.container}
      isLoading={true}
      layout={[
        { key: 'imageSkeleton', width: 255, height: 200, borderRadius: 10, alignSelf: 'center', margin: 15 },
        { key: 'textSkeleton1', width: '80%', height: 20, marginHorizontal: 10, marginVertical: 5, borderRadius: 4 },
        { key: 'textSkeleton2', width: '80%', height: 20, marginHorizontal: 10, marginVertical: 5, borderRadius: 4 },
        { key: 'textSkeletonSmall', width: '50%', height: 20, marginHorizontal: 10, marginVertical: 5, borderRadius: 4 },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    paddingBottom: 15,
    width: 280,
    borderRadius: 10,
    borderColor: '#EBEBEB',
    borderWidth: 1,
    marginBottom: 80,
    marginLeft: 20,
    overflow: 'hidden',
  },
});

export default SkeletonLoader;

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useWindowDimensions } from 'react-native';

const PricingInfo = ({ carWashTypes }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  // Group car wash types by their unique type
  const groupedTypes = carWashTypes.reduce((acc, type) => {
    if (!acc[type.type]) {
      acc[type.type] = [];
    }
    acc[type.type].push(type);
    return acc;
  }, {});

  const routes = Object.keys(groupedTypes).map((type, idx) => ({
    key: idx.toString(),
    title: type,
  }));

  const renderScene = ({ route }) => {
    const selectedType = groupedTypes[Object.keys(groupedTypes)[parseInt(route.key)]];

    return (
      <View style={styles.tabContainer}>
        <FlatList
          data={selectedType}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={styles.priceCard}>
              <Ionicons name="car-outline" size={50} style={styles.icon} />
              <Text style={styles.priceText}>₮{item.price}</Text>
              <Text style={styles.sizeText}>{item.size}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textDescription}>Үнийн мэдээлэл</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={styles.indicatorStyle}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    paddingTop: 16,
    borderRadius: 20,
  },
  textDescription: {
    color: '#323232',
    fontSize: 20,
    fontWeight: 'bold',
    // marginLeft: 20,
    marginBottom: 10,
  },
  tabContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',

    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20,
    // margin:20,
    marginVertical:20,
    padding: 10,
    borderRadius: 15, // Add border radius for rounded corners
    // borderColor: '#365EC6',
    borderColor: '#E0E0E0',
    borderWidth: 1.5, // 
    // marginTop: 20,
  },
  priceCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    width: (Dimensions.get('window').width - 60) / 3, // Adjust card width to display 3 cards in view
  },
  priceText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  sizeText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
  },
  tabBar: {
    // paddingLeft:20,
    backgroundColor: '#fff',
  },
  indicatorStyle: {
    textAlign:'center',
    // marginHorizontal:20,
    paddingHorizontal:20,
    backgroundColor: '#365EC6',
    height:8,
    borderTopEndRadius:10,
    borderTopStartRadius:10
  },
  tabLabel: {
    // color: '#007AFF',
    color: '#365EC6',
    fontSize:14,
    fontWeight: 'bold',
  },
  icon: {
    color: '#000',
  },
});

export default PricingInfo;

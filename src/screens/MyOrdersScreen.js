import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { fetchUserOrders as fetchUserOrdersApi } from '../api/user';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FlexHeader from '../components/FlexHeader';
import Switch from '../components/Switch';
import OrderItem from '../components/OrderItem';

const MyOrdersScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [index, setIndex] = useState(0);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [routes] = useState([
    { key: 'successful', title: 'Амжилттай' },
    { key: 'unsuccessful', title: 'Амжилтгүй' },
  ]);
 

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const data = await fetchUserOrdersApi(userInfo.id);
      const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const renderOrderItem = ({ item, index }) => (
    <OrderItem order={item} index={index} />
  );

  const SuccessfulOrders = () => (
    <View style={styles.tabContainer}>
      <FlatList
        data={orders.filter(order => order.status === 'paid')}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  const UnsuccessfulOrders = () => (
    <View style={styles.tabContainer}>
      <FlatList
        data={orders.filter(order => order.status !== 'paid')}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  const renderScene = SceneMap({
    successful: SuccessfulOrders,
    unsuccessful: UnsuccessfulOrders,
  });

  return (
    <View style={styles.container}>
      <FlexHeader headerText={"Миний захиалгууд"} navigation={navigation}/>
      <Switch isSuccessful={isSuccessful} setIsSuccessful={setIsSuccessful}/>
      <View style={styles.tabContainer}>
     

      <>
      {isSuccessful ? (
        <FlatList
          data={orders.filter(order => order.status === 'paid')}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <FlatList
          data={orders.filter(order => order.status !== 'paid')}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003366',
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  backButton: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 10,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    paddingVertical: 5,
  },
  indicator: {
    backgroundColor: '#FFD700',
    height: 5,
    borderRadius: 10,
  },
  labelStyle: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabContainer: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingTop: 16,
  },
  orderContainer: {
    backgroundColor: '#F4F6F9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 4,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  orderDetails: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default MyOrdersScreen;

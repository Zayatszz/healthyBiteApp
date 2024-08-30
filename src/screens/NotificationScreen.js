import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { fetchUserOrders as fetchUserOrdersApi } from '../api/user';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FlexHeader from '../components/FlexHeader';
import Switch from '../components/Switch';
import OrderItem from '../components/OrderItem';
import NotificationItem from '../components/NotificationItem';

const NotificationScreen = ({ navigation }) => {

 

//   useEffect(() => {
//     fetchUserOrders();
//   }, []);

//   const fetchUserOrders = async () => {
//     try {
//       const data = await fetchUserOrdersApi(userInfo.id);
//       const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setOrders(sortedOrders);
//     } catch (error) {
//       console.error('Failed to fetch orders:', error);
//     }
//   };

  return (
    <View style={styles.container}>
      <FlexHeader headerText={"Мэдэгдэл"} navigation={navigation}/>
      
      <View style={styles.itemContainer}>
      <>
        {/* <FlatList
          data={orders.filter(order => order.status === 'paid')}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
        /> */}
         {/* <FlatList
            data={notifications}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <NotificationItem />}
            keyExtractor={item => item.id.toString()}
          /> */}
          <NotificationItem/>
          <NotificationItem/>
          <NotificationItem/>
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

  itemContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },



});

export default NotificationScreen;

// components/OrderItem.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Feather from 'react-native-vector-icons/Feather';
import Animated, { FadeInDown } from "react-native-reanimated";

const formatTime = (datetime) => {
  const date = new Date(datetime);
  return format(date, 'HH:mm');
};

const OrderItem = ({ order, index }) => {
  return (
<Animated.View entering={FadeInDown.delay(200*index)}>

    <View style={styles.orderItem}>
      {/* <Text style={styles.orderText}>Захиалга ID: {order.id}</Text>
      <Text style={styles.orderText}>Машины төрөл: {order.carSize}</Text>
      <Text style={styles.orderText}>Угаалгах төрөл: {order.washType}</Text>
      <Text style={styles.orderText}>Огноо: {order.date}</Text>
      <Text style={styles.orderText}>{formatTime(order.date)}</Text>
      <Text style={styles.orderText}>Цаг: {new Date(order.scheduledTime).toLocaleTimeString()}- {new Date(order.endTime).toLocaleTimeString()}</Text>
      <Text style={styles.orderText}>Үнэ: {order.price}₮</Text> */}

      {/* <Text style={styles.orderText}>Огноо: {order.date}</Text> */}
      <View style={styles.flex}>
        <Text style={styles.orderName}>{order.carwashService.name}</Text>
        <View style={styles.flexz}>
          <Text style={styles.orderName}>{order.price}₮</Text>
          <Feather name='chevron-down' style={[styles.icon ]} />
        </View>
      </View>
      <View style={[styles.flex, styles.info]}>
        <Text style={styles.text14}>{order.carwashService.location}</Text>
       
          <Text style={styles.text14}>
            {/* {order.date} */}  2024-08-24
            </Text>
       
      </View>
    
    </View>
</Animated.View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#F4F6F9',
    borderRadius: 12,
  },
  orderText: {
    fontSize: 16,
  },
  orderName:{
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  text14:{
    paddingTop:8,
    fontSize: 14,
    // fontWeight: '500',
    color: '#828282',
  },
  flex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  flexz:{
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center', 
  },
  info:{
    paddingRight:16
  },
  icon: {
    fontSize: 18,
    
    color: '#000',
    paddingLeft:8
  },
});

export default OrderItem;

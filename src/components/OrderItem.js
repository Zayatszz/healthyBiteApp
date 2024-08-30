// components/OrderItem.js

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Feather from 'react-native-vector-icons/Feather';
import Animated, { FadeInDown } from "react-native-reanimated";
import { TouchableOpacity } from 'react-native-gesture-handler';

const formatTime = (datetime) => {
  const date = new Date(datetime);
  return format(date, 'HH:mm');
};

const OrderItem = ({ order, index }) => {
  const [isClicked, setIsClicked] = useState(false);
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
      <TouchableOpacity onPress={()=>setIsClicked(!isClicked)}>

        <View style={styles.flex}>
          <Text style={styles.orderName}>{order.carwashService.name}</Text>
          <View style={styles.flexz}>
            <Text style={styles.orderName}>{order.price}₮</Text>
            {
              isClicked ? (
                <Feather name='chevron-up' style={[styles.icon ]} />
              )
              :(
                <Feather name='chevron-down' style={[styles.icon ]} />
              )
            }
            
          </View>
        </View>
        <View style={[styles.flex, styles.info]}>
          <Text style={styles.text14}>{order.carwashService.location}</Text>
        
            <Text style={styles.text14}>
              {/* {order.date} */}  2024-08-24
              </Text>
        </View>
      </TouchableOpacity>
      {
        isClicked && (
          <View style={[ styles.detailInfo]}>
        <View style={styles.flex}>
          <Text style={styles.detailText}>Машины төрөл</Text>
          <Text style={styles.detailText}>{order.carSize}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.detailText}>Угаалгах төрөл</Text>
          <Text style={styles.detailText}>{order.washType}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.detailText}>Захиалсан өдөр</Text>
          <Text style={styles.detailText}>2024-10-11</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.detailText}>Захиалсан цаг</Text>
          <Text style={styles.detailText}>10:00 - 11:00</Text>
        </View>
     
      </View>
    
        )
      }
      
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
  detailText:{
    fontSize: 14,
    paddingTop:8,
    color: '#000',
    fontWeight:'400'
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
  detailInfo:{
    backgroundColor:"#fff",
    borderRadius:12,
    padding:16,
    paddingTop:8,
    marginTop:16
  },
  icon: {
    fontSize: 18,
    
    color: '#000',
    paddingLeft:8
  },
});

export default OrderItem;

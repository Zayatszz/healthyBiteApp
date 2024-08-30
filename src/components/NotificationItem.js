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

const NotificationItem = ({ index }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
<Animated.View entering={FadeInDown.delay(200*index)}>

    <View style={styles.orderItem}>
  
        <View style={styles.flex}>
          
     
        </View>
        <View style={ styles.info}>
          <Text style={styles.text14}>2024-08-23</Text>
          <Text style={styles.text}>Аму - энгийн гадна угаалгын захиалга амжилттай хийгдлээ. </Text>
         
        </View>
 
      
    </View>
</Animated.View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 10,
    backgroundColor: '#F4F6F9',
    borderRadius: 12,
  },
  orderText: {
    fontSize: 16,
  },
  text:{
    paddingTop:8,
    fontSize: 16,
    fontWeight: '480',
    color: '#000',
    lineHeight:24
    
  },
  text14:{
    paddingTop:8,
    fontSize: 14,
    // fontWeight: '500',
    color: '#828282',
  },
 

});

export default NotificationItem;

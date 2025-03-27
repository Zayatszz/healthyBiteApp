import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const FlexHeader = ({ headerText, navigation }) => {

  return (
    
    <View style={[styles.flexHeader]}>
    <Pressable onPress={() => navigation.goBack()}>
      <View style={styles.iconBorder}>
      {/* <Ionicons name='left' style={styles.icon} /> */}
      <Ionicons name="chevron-back" size={24} color="#fff" />

      </View>
        
    </Pressable>
    <Text style={styles.headerTitle}>{headerText}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
    flexHeader: {
        padding: 20,
        // paddingBottom:15,
        // paddingHorizontal:20,
      
        // backgroundColor: '#033669',
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom:20

   
       
      },
      headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft:20,
        color: '#000',
      },
      iconBorder:{
        width:40, 
        height:40,
        borderRadius:50,
        backgroundColor: '#50B86C',
        justifyContent: 'center', 
        alignItems: 'center'
      },
      icon: {
        fontSize: 20,
        borderRadius: 50,
        color: '#fff',
      },
});

export default FlexHeader;

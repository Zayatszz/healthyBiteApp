import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const FlexHeader = ({ headerText, navigation }) => {

  return (
    
    <View style={[styles.flexHeader]}>
    <Pressable onPress={() => navigation.goBack()}>
        <FontAwesome name='chevron-left' style={styles.icon} />
    </Pressable>
    <Text style={styles.headerTitle}>{headerText}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
    flexHeader: {
        padding: 16,
        // paddingBottom:15,
        paddingHorizontal:30,
        paddingRight:20,
        backgroundColor: '#033669',
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom:20

   
       
      },
      headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        paddingLeft:20,
        color: '#fff',
      },
      icon: {
        fontSize: 20,
        borderRadius: 50,
        color: '#fff',
      },
});

export default FlexHeader;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FormTest from './FormTest';
import CarWashItem from './CarWashItem';
import { FlatList } from 'react-native';
// import { SearchBar } from '@rneui/themed';
import { SearchBar } from 'react-native-screens';
const logoImg = require('../assets/emu-logo.png');
const HomeScreen = () => {

    const [search, setSearch] = useState("");
    
    const updateSearch = (search) => {
      setSearch(search);
    };
  const [carwashList, setCarwashList] = useState([]);
  
  
  useEffect(() => {
    fetchCarwList();
  }, []);

  const fetchCarwList = async () => {
    try {
      const response = await fetch('http://192.168.100.37:3003/carwashes');
      const data = await response.json();
      console.log(data);
      setCarwashList(data);
    } catch (error) {
      console.error(error);
    }
  };
  //   const [carwashList, setcarwashList] = useState([
  //     {
  //       id:1,
  //       name: 'АМУ',
  //       imageLink: 'carwashApp1.png',
  //       price: '20000',
  //       location: 'УБ, Баянзүрх, 3-р хороо'
  //     },
  //     {
  //       id:2,
  //       name: 'Супер угаалт',
  //       imageLink: 'carwashApp2.jpg',
  //       price: '30000',
  //       location: 'УБ, Чингэлтэй, 3-р хороо'
  //     },
  //     {
  //       id:3,
  //       name: 'Magic',
  //       imageLink: 'carwashApp3.jpg',
  //       price: '25000',
  //       location: 'УБ, Баянзүрх, 5-р хороо'
  //     },
  // ]);

    return (
      <View style={styles.container}>
        <View style={styles.flexHeader}>
          <Image style={styles.logoImg} source={logoImg} />
          <View style={styles.addWrapper}>
          <Text>
  
            <Icon name='bell-ring-outline' style={{color:'black', fontSize:30}}/>
          </Text>
            {/* <Text style={styles.addText}>+</Text> */}
          </View>
        </View>
        <View style={[styles.section1]}>
          <Text style={styles.sectionTitle}>EMU</Text>
          <Text style={styles.paragraph}>Машин угаалгын апп</Text>
        </View>

        {/* <View style={styles.view}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
        />
  </View> */}
  <View style={styles.searchBar}>
    <Text style={styles.parText}>Угаалгын газар хайх</Text>
  </View>
        <View style={styles.flex}>
          <Text style={styles.parText}>Угаалгын газрууд</Text>
          <TouchableOpacity style={[styles.allBtn, styles.flexz]}>
            <Text style={styles.addText}>Бүгд</Text>
            <MaterialIcons name='navigate-next' style={{color:'black', fontSize:25, }}/>
  
            
          </TouchableOpacity>
        </View>
        <Text>
  
          {/* <AntDesign name='home' style={{color:'red', fontSize:50}}/>; */}
        </Text>
        <View style={styles.CarWashItem}>
            <FlatList 
                data={carwashList} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item})=> 
                    <CarWashItem carwash={item} />
                }
                keyExtractor={item => item.id}
            />
        </View>
        <View>
            {/* <FormTest/> */}
        </View>
        
      </View>
    );
  };

  const styles = StyleSheet.create({
    searchBar:{
      padding: 10,
      // margin: 20,
      marginRight:30,
      // backgroundColor: '#FFF',
      backgroundColor: '#000',
      width: '100%',
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
    },
    view: {
      margin: 10,
    },
    container: {
      flex: 1,
      backgroundColor: '#066BCF',
    },
    section1: {
      paddingTop: 60,
      paddingBottom: 60,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 50,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FFF',
    },
    paragraph: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FFF',
    },
    parText: {
      fontSize: 20,
      textAlign: 'center',
      color: '#FFF',
    },
    flexHeader: {
      padding: 10,
      paddingHorizontal: 20,
      // backgroundColor: '#FFF',
      backgroundColor: '#066BCF',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flex: {
      padding: 10,
      paddingHorizontal: 20,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flexz: {
      
      flexDirection: 'row',
      padding: 5,
      // justifyContent: 'space-between',
      alignItems: 'center',
    },
    allBtn: {
      width: 120,
      height: 40,
      // backgroundColor: '#FFF',
      backgroundColor: '#58B3F0',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      // borderWidth: 1,
    },
    logoImg: {
      width: 70,
      height: 60,
      borderRadius: 10,
    },
    CarWashItem: {
      paddingHorizontal: 20,
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#58B3F0',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#18A0FB',
      borderWidth: 1,
    },
    addText: {
      fontWeight: 'bold',
      color:'#000',
      fontSize:18
    },
  });

export default HomeScreen;
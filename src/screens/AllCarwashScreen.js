import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CarWashItem from '../components/CarWashItem';
import { fetchCarwashList as fetchCarwashListApi } from '../../api/user';
import { fetchCarwashServiceList as fetchCarwashServiceListApi } from '../../api/user';

const logoImg = require('../../assets/emu-logo.png');

const HomeScreen = ({navigation}) => {
  const [carwashList, setCarwashList] = useState([]);
  
  useEffect(() => {
    fetchCarwashList();
  }, []);

  const fetchCarwashList = async () => {
    try {
      // const data = await fetchCarwashListApi();
      const data = await fetchCarwashServiceListApi();
      setCarwashList(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.flex}>
        <Text style={styles.parText}>Угаалгын газрууд</Text>
       
      </View>
      <View style={styles.CarWashItem}>
        <FlatList 
          data={carwashList} 
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CarWashItem carwash={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          
        />
      </View>
      {/* <BottomTabNavigator /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    padding: 10,
    marginRight: 30,
    backgroundColor: '#000',
    width: '100%',
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
    alignItems: 'center',
  },
  allBtn: {
    width: 120,
    height: 40,
    backgroundColor: '#58B3F0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
  },
  logoImg: {
    width: 70,
    height: 60,
    borderRadius: 10,
  },
  CarWashItem: {
    paddingHorizontal: 20,
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
    color: '#000',
    fontSize: 18,
  },
});

export default HomeScreen;

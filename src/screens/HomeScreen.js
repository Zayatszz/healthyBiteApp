import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CarWashItem from '../components/CarWashItem';
import { fetchCarwashList as fetchCarwashListApi } from '../../api/user';

const logoImg = require('../../assets/emu-logo.png');

const HomeScreen = () => {
  const [carwashList, setCarwashList] = useState([]);
  
  useEffect(() => {
    fetchCarwashList();
  }, []);

  const fetchCarwashList = async () => {
    try {
      const data = await fetchCarwashListApi();
      setCarwashList(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexHeader}>
        <Image style={styles.logoImg} source={logoImg} />
        <View style={styles.addWrapper}>
          <Text>
            <Icon name='bell-ring-outline' style={{ color: 'black', fontSize: 30 }} />
          </Text>
        </View>
      </View>
      <View style={[styles.section1]}>
        <Text style={styles.sectionTitle}>EMU</Text>
        <Text style={styles.paragraph}>Машин угаалгын апп</Text>
      </View>
      <View style={styles.searchBar}>
        <Text style={styles.parText}>Угаалгын газар хайх</Text>
      </View>
      <View style={styles.flex}>
        <Text style={styles.parText}>Угаалгын газрууд</Text>
        <TouchableOpacity style={[styles.allBtn, styles.flexz]}>
          <Text style={styles.addText}>Бүгд</Text>
          <MaterialIcons name='navigate-next' style={{ color: 'black', fontSize: 25 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.CarWashItem}>
        <FlatList 
          data={carwashList} 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CarWashItem carwash={item} />}
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

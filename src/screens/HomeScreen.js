import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CarWashItem from '../components/CarWashItem';
import { fetchCarwashServiceList as fetchCarwashServiceListApi } from '../../api/user';
import { Dropdown } from 'react-native-element-dropdown';

const logoImg = require('../../assets/logoo.png');

const HomeScreen = ({ navigation }) => {
  const [carwashList, setCarwashList] = useState([]);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [selectedWashType, setSelectedWashType] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const carTypes = [
    { label: '10-11', value: '10-11' },
    { label: '11-12', value: '11-12' },
    { label: '12-13', value: '12-13' },
  ];

  useEffect(() => {
    fetchCarwashList();
  }, []);

  const fetchCarwashList = async () => {
    try {
      const data = await fetchCarwashServiceListApi();
      setCarwashList(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.flexHeader}>
        <Image style={styles.logoImg} source={logoImg} />
        <Text>
          <Feather name='bell' style={styles.bellIcon} />
        </Text>
      </View>
      <View style={styles.section1}>
        <Text style={styles.sectionTitle}>Бага хай. Илүү амьдар.</Text>
      </View>
      <View style={styles.searchSection}>
        <Dropdown
          style={styles.dropdown}
          data={carTypes}
          labelField="label"
          valueField="value"
          placeholder="Машины хэмжээ"
          value={selectedCarType}
          onChange={item => {
            setSelectedCarType(item.value);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          data={carTypes}
          labelField="label"
          valueField="value"
          placeholder="Угаалгах төрөл"
          value={selectedWashType}
          onChange={item => {
            setSelectedWashType(item.value);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          data={carTypes}
          labelField="label"
          valueField="value"
          placeholder="Аймаг, хот"
          value={selectedProvince}
          onChange={item => {
            setSelectedProvince(item.value);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          data={carTypes}
          labelField="label"
          valueField="value"
          placeholder="Сум, дүүрэг"
          value={selectedDistrict}
          onChange={item => {
            setSelectedDistrict(item.value);
          }}
        />
        <TouchableOpacity style={[styles.button, styles.flexz]}>
          <Feather name='search' style={{ color: '#FFF', fontSize: 25 }} />
          <Text style={styles.buttonText}>Угаалгын газар хайх</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.searchSection}>
       
     
     
        <TouchableOpacity style={[styles.button, styles.flexz]}>
          <Feather name='search' style={{ color: '#FFF', fontSize: 25 }} />
          <Text style={styles.buttonText}>Угаалгын газар хайх</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.flex}>
        <Text style={styles.parText}>Угаалгын газрууд</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('AllCarwash')} >

        <Text style={styles.addText}>Бүгдийг харах</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.CarWashItem}>
        <FlatList 
          data={carwashList} 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CarWashItem carwash={item} navigation={navigation} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  section1: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  parText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  flexHeader: {
    padding: 10,
    backgroundColor: '#E0E0E0',
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
  searchSection: {
    paddingHorizontal: 20,
    marginBottom:10
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 15,
  },
  CarWashItem: {
    paddingTop:15,
    paddingBottom:30,
    paddingHorizontal: 20,
  },
  logoImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  bellIcon: {
    color: 'black', 
    fontSize: 25,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#268AE6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  
  },
  buttonText: {
    paddingLeft: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addText: {
    color: '#8B8E95',
    fontSize: 16,
  },
});

export default HomeScreen;

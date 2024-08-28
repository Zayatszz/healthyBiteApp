import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Pressable } from 'react-native';
import CarWashItem from '../components/CarWashItem1';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlexHeader from '../components/FlexHeader';

const AllCarwashScreen = ({ route, navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const { filteredList } = route.params;
  const [filteredCarwashList, setFilteredCarwashList] = useState(filteredList);

  useEffect(() => {
    filterCarwashesByName();
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filterCarwashesByName = () => {
    const filtered = filteredList.filter(carwash =>
      carwash.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCarwashList(filtered);
    console.log(filtered)
  };

  return (
    <View style={styles.container}>
    <FlexHeader headerText={'Угаалгын газар сонгох'} navigation={navigation}/>
     
      <View style={ styles.searchSection }>

        <View style={styles.searchInputz}>
        <AntDesign name='search1' style={styles.searchIcon} />
          <TextInput
            
            placeholder="Угаалгын газрын нэрээр хайх"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <View style={styles.CarWashItem}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          filteredCarwashList.length === 0 ? (
            <Text style={styles.noResults}>Угаалгын газар олдсонгүй.</Text>
          ) : (
            // <Text style={styles.noResults}>{filteredCarwashList.length } ийм байна</Text>
            <FlatList
              data={filteredCarwashList}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <CarWashItem carwash={item} index={index} navigation={navigation} />}
              keyExtractor={item => item.id.toString()}
            />
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  flex: {
    padding: 10,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  searchInputz: {
    // height: 50,
    
    borderColor: '#E0E0E0',
    backgroundColor:"#F4F6F9",
    borderWidth: 1,
    borderRadius: 5,
   
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 10,
    // width: '100%',
  },
  searchSection:{
    margin:20
  },
  flexz: {
    padding: 10,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CarWashItem: {
    paddingHorizontal: 20,
    marginBottom: 160,
  },
  noResults: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
  },

  searchIcon:{
    fontSize: 20,
    paddingRight:15
  }
 
});

export default AllCarwashScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Pressable } from 'react-native';
// import CarWashItem from '../components/CarWashItem1';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FlexHeader from '../components/FlexHeader';

// const AllCarwashScreen = ({ route, navigation }) => {
//   const [searchText, setSearchText] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { filteredList } = route.params;
//   const [filteredCarwashList, setFilteredCarwashList] = useState(filteredList);

//   useEffect(() => {
//     filterCarwashesByName();
//   }, [searchText]);

//   const handleSearch = (text) => {
//     setSearchText(text);
//   };

//   const filterCarwashesByName = () => {
//     const filtered = filteredList.filter(carwash =>
//       carwash.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredCarwashList(filtered);
//     console.log(filtered)
//   };

//   return (
//     <View style={styles.container}>
//     <FlexHeader headerText={'Өглөөний хоол'} navigation={navigation}/>
     
//       <View style={ styles.searchSection }>

//         <View style={styles.searchInputz}>
//         <AntDesign name='search1' style={styles.searchIcon} />
//           <TextInput
            
//             placeholder="Хоолны нэрээр хайх"
//             value={searchText}
//             onChangeText={handleSearch}
//           />
//         </View>
//       </View>
//       <View style={styles.CarWashItem}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : (
//           filteredCarwashList.length === 0 ? (
//             <Text style={styles.noResults}>Угаалгын газар олдсонгүй.</Text>
//           ) : (
//             // <Text style={styles.noResults}>{filteredCarwashList.length } ийм байна</Text>
//             <FlatList
//               data={filteredCarwashList}
//               horizontal={false}
//               showsHorizontalScrollIndicator={false}
//               renderItem={({ item, index }) => <CarWashItem carwash={item} index={index} navigation={navigation} />}
//               keyExtractor={item => item.id.toString()}
//             />
//           )
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'#fff'
//   },
//   flex: {
//     padding: 10,
//     paddingHorizontal: 20,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   searchInput: {
//     height: 50,
//     borderColor: '#000',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     width: '100%',
//   },
//   searchInputz: {
//     // height: 50,
//     height: 60,
    
//     borderColor: '#E0E0E0',
//     backgroundColor:"#F4F6F9",
//     borderWidth: 1,
//     borderRadius: 16,
   
//     paddingHorizontal: 20,
//     width: '100%',
//     flexDirection: 'row',
//     // justifyContent: 'space-between',
//     alignItems: 'center',
//     // paddingHorizontal: 10,
//     // width: '100%',
//   },
//   searchSection:{
//     marginHorizontal:20,
//     marginBottom:20
//   },
//   flexz: {
//     padding: 10,
//     paddingHorizontal: 20,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   CarWashItem: {
//     paddingHorizontal: 20,
//     marginBottom: 160,
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#000',
//     fontSize: 18,
//   },

//   searchIcon:{
//     fontSize: 20,
//     paddingRight:15
//   }
 
// });

// export default AllCarwashScreen;



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlexHeader from '../components/FlexHeader';
import FoodItem from '../components/FoodItem';

const defaultFoods = [
  {
    id: '1',
    name: 'Scrambled egg breakfast',
    kcal: 359,
    time: '10 mins',
    isSelected: false,
    isFavorite: false,
    image: require('../../assets/logoo.png')
  },
  {
    id: '2',
    name: 'Yogurt Parfait',
    kcal: 415,
    time: '5 mins',
    isSelected: true,
    isFavorite: true,
    image: require('../../assets/logoo.png')
  },
  {
    id: '3',
    name: 'Spinach Banana Smoothie',
    kcal: 415,
    time: '5 mins',
    isSelected: false,
    isFavorite: true,
    image: require('../../assets/logoo.png')
  },
  {
    id: '4',
    name: 'Breakfast sandwich',
    kcal: 465,
    time: '10 mins',
    isSelected: false,
    isFavorite: false,
    image: require('../../assets/logoo.png')
  },
  {
    id: '5',
    name: 'Banana toast & egg',
    kcal: 444,
    time: '5 mins',
    isSelected: false,
    isFavorite: false,
    image: require('../../assets/logoo.png')
  },
];

const imageMap = {
  "/images/avocado-toast.jpg": require('../../assets/images/avocado-toast.jpg'),
  "/images/scrambled-eggs.jpg": require('../../assets/images/scrambled-eggs.jpg'),
  // бусад зургууд...
};



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
  const [mealTime, setMealTime] = useState('Өглөө'); // default


 

  console.log("Zaya's test", filteredCarwashList)
  return (
    <View style={styles.container}>
      <FlexHeader headerText={'Өглөөний хоол'} navigation={navigation} />
      <View style={styles.searchSection}>
        <View style={styles.searchInputz}>
          <AntDesign name='search1' style={styles.searchIcon} />
          <TextInput
            placeholder="Хоолны нэрээр хайх"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <View style={styles.mealTimeTabs}>
  {['Өглөө', 'Өдөр', 'Орой'].map((label) => (
    <TouchableOpacity
      key={label}
      onPress={() => setMealTime(label)}
      style={[
        styles.mealTimeBtn,
        mealTime === label && styles.mealTimeBtnActive
      ]}
    >
      <Text
        style={[
          styles.mealTimeText,
          mealTime === label && styles.mealTimeTextActive
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  ))}
</View>

      
            {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          filteredCarwashList.length === 0 ? (
            <Text style={styles.noResults}>Угаалгын газар олдсонгүй.</Text>
          ) : (
      <FlatList
        data={filteredCarwashList}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
       
        renderItem={({ item, index }) => <FoodItem food={item} index={index} navigation={navigation} />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        keyExtractor={item => item.id.toString()}
      />
    )
  )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchSection: {
    marginHorizontal: 20,
    marginBottom: 8
  },
  searchInputz: {
    height: 60,
    borderColor: '#E0E0E0',
    backgroundColor: '#F4F6F9',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
    paddingRight: 15
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    marginBottom: 16,
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
  },
  foodContent: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  foodDetails: {
    fontSize: 14,
    color: '#6D7074',
    marginTop: 4,
  },
  actions: {
    alignItems: 'center',
  },
  // tab section
  mealTimeTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F4F6F9',
    borderRadius: 16,
    padding: 2,
  },
  mealTimeBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
  },
  mealTimeBtnActive: {
    backgroundColor: '#50B86C',
  },
  mealTimeText: {
    color: '#6D7074',
    fontSize: 16,
    fontWeight: '500',
  },
  mealTimeTextActive: {
    color: '#fff',
  },
  
});

export default AllCarwashScreen;

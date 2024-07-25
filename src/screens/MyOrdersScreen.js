import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Dimensions } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { fetchUserOrders as fetchUserOrdersApi } from '../api/user';
import OrderItem from '../components/OrderItem';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const MyOrdersScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'successful', title: 'Амжилттай' },
    { key: 'unsuccessful', title: 'Амжилтгүй' },
  ]);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  // const fetchUserOrders = async () => {
  //   try {
  //     const data = await fetchUserOrdersApi(userInfo.id);
  //     setOrders(data);
  //   } catch (error) {
  //     console.error('Failed to fetch orders:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchUserOrders = async () => {
    try {
      const data = await fetchUserOrdersApi(userInfo.id);
      // Sort orders by date in descending order (latest orders first)
      const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderOrderItem = ({ item }) => (
    <OrderItem order={item} />
  );

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  const SuccessfulOrders = () => (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders.filter(order => order.status === 'paid')}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );

  const UnsuccessfulOrders = () => (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders.filter(order => order.status !== 'paid')}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );

  const renderScene = SceneMap({
    successful: SuccessfulOrders,
    unsuccessful: UnsuccessfulOrders,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Миний захиалгууд:</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.labelStyle}
          />
        )}
      />
      <Button title="Go to Home" onPress={navigateToHome} />
    </View>
  );
};


const styles = StyleSheet.create({
    section:{
        backgroundColor:'#fff',
        marginHorizontal:20,
        marginTop:20,
        padding:20,
        


    }, 
    carwashImg:{
        // width:280,
        height:200,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
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
    fontSize: 16,
    fontWeight: 'bold',
    // textAlign: 'center',
    // color: '#FFF',
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

  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#1E90FF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },


  tabBar: {
    backgroundColor: '#ffffff',
  },
  indicator: {
    // backgroundColor: '#0000ff',
  },
  labelStyle: {
    color: '#000',
  },
});

export default MyOrdersScreen;

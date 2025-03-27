import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { fetchUserOrders as fetchUserOrdersApi } from '../api/user';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FlexHeader from '../components/FlexHeader';
import Switch from '../components/Switch';
import OrderItem from '../components/OrderItem';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; 
import RegisteredMeals from '../components/RegisteredMeals';
import { LineChart } from 'react-native-chart-kit';
const StatisticsScreen = ({ navigation }) => {
    const screenWidth = Dimensions.get('window').width - 40;
  const { userInfo } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [index, setIndex] = useState(0);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const groupedMeals = [
    {
      date: '2025-03-12',
      meals: {
        Өглөө: [{ id: 1, name: 'Scrambled egg breakfast', kcal: 359, time: '10 mins', image: require('../../assets/logoo.png') }],
        Өдөр: [{ id: 2, name: 'Banana toast & egg', kcal: 359, time: '10 mins', image: require('../../assets/logoo.png') }],
        Орой: [{ id: 3, name: 'Yogurt Parfait', kcal: 359, time: '10 mins', image: require('../../assets/logoo.png') }]
      }
    },
    {
      date: '2025-03-13',
      meals: {
        Өглөө: [{ id: 1, name: 'Scrambled egg breakfast', kcal: 359, time: '10 mins', image: require('../../assets/logoo.png') }],
        Өдөр: [{ id: 2, name: 'Banana toast & egg', kcal: 359, time: '10 mins', image: require('../../assets/logoo.png') }],
        Орой: [{ id: 3, name: 'Yogurt Parfait', kcal: 359, time: '10 mins', image: require('../../assets/logoo.png') }]
      }
    }
  ];
  
  const [routes] = useState([
    { key: 'successful', title: 'Амжилттай' },
    { key: 'unsuccessful', title: 'Амжилтгүй' },
  ]);
 

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const data = await fetchUserOrdersApi(userInfo.id);
      const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const renderOrderItem = ({ item, index }) => (
    <OrderItem order={item} index={index} />
  );

  const SuccessfulOrders = () => (
    <View style={styles.tabContainer}>
      {/* <FlatList
        data={orders.filter(order => order.status === 'paid')}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </View>
  );

  const UnsuccessfulOrders = () => (
    <View style={styles.tabContainer}>
      {/* <FlatList
        data={orders.filter(order => order.status !== 'paid')}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </View>
  );

  const renderScene = SceneMap({
    successful: SuccessfulOrders,
    unsuccessful: UnsuccessfulOrders,
  });
  const [startDate, setStartDate] = useState(new Date('2025-03-12'));
  const [endDate, setEndDate] = useState(new Date('2025-03-13'));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  
  const onStartChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };
  
  const onEndChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
 <View style={styles.container}>
      <FlexHeader headerText={"Миний үзүүлэлтүүд"} navigation={navigation}/>
      <Switch isSuccessful={isSuccessful} setIsSuccessful={setIsSuccessful}/>
      <View style={styles.tabContainer}>
     

      <>
      {isSuccessful && (
        <View>
            <View style={styles.dateContainer}>
  <TouchableOpacity style={styles.dateBox} onPress={() => setShowStartPicker(true)}>
    <Text style={styles.dateText}>{moment(startDate).format('MM/DD/YYYY')}</Text>
  </TouchableOpacity>
  <Text style={styles.dash}>—</Text>
  <TouchableOpacity style={styles.dateBox} onPress={() => setShowEndPicker(true)}>
    <Text style={styles.dateText}>{moment(endDate).format('MM/DD/YYYY')}</Text>
  </TouchableOpacity>
</View>

{showStartPicker && (
  <DateTimePicker
    value={startDate}
    mode="date"
    display="default"
    onChange={onStartChange}
  />
)}
{showEndPicker && (
  <DateTimePicker
    value={endDate}
    mode="date"
    display="default"
    onChange={onEndChange}
  />
)}

         

       
              <Text style={styles.title}>Бүртгэгдсэн хоол</Text>
              
             <RegisteredMeals groupedMeals={groupedMeals} />

             <Text style={styles.title}>Хоолны калори</Text>

             <View style={[styles.card, ]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ color: '#000', fontSize:12, fontWeight:'bold' }}>2024/10/22-26</Text>
            {/* <Text style={{ fontWeight: 'bold', color: '#1B1C1E', fontSize:16 }}>7 Бүртгэл</Text> */}
          </View>
          <LineChart
            data={{
              labels: ['1', '2', '3', '4', '5', '6', '7'],
              datasets: [
                {
                  data: [200, 450, 300, 800, 1200, 600, 1100],
                },
              ],
            }}
            width={screenWidth-40}
            height={200}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(65, 171, 248, ${opacity})`,
              labelColor: () => '#000',
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#4BC0C0',
              },
            }}
            bezier
            style={{ borderRadius: 8 }}
          />
          <View style={styles.chartFooter}>
  <Text style={styles.chartLabel}>Дундаж калори</Text>
  <Text style={styles.chartValue}>1800 ккал</Text>
</View>

        </View>
        <Text style={styles.title}>Жингийн үзүүлэлт</Text>

<View style={[styles.card, {marginBottom:120}]}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
    <Text style={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>2025/03/01 - 2025/03/07</Text>
    {/* <Text style={{ fontWeight: 'bold', color: '#1B1C1E', fontSize: 16 }}>7 Хэмжилт</Text> */}
  </View>

  <LineChart
    data={{
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [
        {
          data: [62.3, 62.1, 61.9, 62.0, 61.8, 61.7, 61.5], // kg
        },
      ],
    }}
    width={screenWidth - 40}
    height={200}
    chartConfig={{
      backgroundColor: '#fff',
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      decimalPlaces: 1,
      color: (opacity = 1) => `rgba(106, 194, 158, ${opacity})`, // Greenish
      labelColor: () => '#000',
      propsForDots: {
        r: '4',
        strokeWidth: '2',
        stroke: '#6AC29E',
      },
    }}
    bezier
    style={{ borderRadius: 8 }}
  />

  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
    <Text style={{ fontSize: 14, color: '#6D7074' }}>Дундаж жин</Text>
    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>61.8 кг</Text>
  </View>
</View>

    
        </View>
        
  
)}
{!isSuccessful && (
  <View style={[{marginTop:20}]}>
    <Text style={styles.title}>Бүртгэгдсэн ус</Text>

    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>2025/03/01 - 2025/03/07</Text>
        {/* <Text style={{ fontWeight: 'bold', color: '#1B1C1E', fontSize: 16 }}>7 Өдөр</Text> */}
      </View>

      <LineChart
        data={{
          labels: ['1', '2', '3', '4', '5', '6', '7'],
          datasets: [
            {
              data: [1200, 1000, 1350, 1100, 1250, 1400, 1300], // ус мл
            },
          ],
        }}
        width={screenWidth - 40}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(77, 133, 255, ${opacity})`,
          labelColor: () => '#000',
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#4D85FF',
          },
        }}
        bezier
        style={{ borderRadius: 8 }}
      />

      <View style={styles.chartFooter}>
        <Text style={styles.chartLabel}>Дундаж усны хэмжээ</Text>
        <Text style={styles.chartValue}>1230 мл</Text>
      </View>
    </View>
  </View>
)}


    </>
    </View>
    </View>
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#171532' },
 
  tabBar: {
    backgroundColor: '#ffffff',
    paddingVertical: 5,
  },
  indicator: {
    backgroundColor: '#FFD700',
    height: 5,
    borderRadius: 10,
  },
  labelStyle: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabContainer: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingTop: 16,
  },
  orderContainer: {
    backgroundColor: '#F4F6F9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 4,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  orderDetails: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },

  dayContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    color: '#000',
  },
  mealTimeText: {
    fontSize: 13,
    color: '#6D7074',
    fontWeight: '600',
    marginVertical: 6,
  },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  card: { 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 28, 
    borderWidth:1,
   borderColor: '#DADADA',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.01, 
    elevation: 1  

  },
  chartFooter: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  chartLabel: {
    fontSize: 14,
    color: '#6D7074',
    fontWeight: '500',
  },
  
  chartValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
  },
  foodName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  foodDetail: {
    fontSize: 12,
    color: '#6D7074',
  },


  dateContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F6F9',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    padding: 12,
    // paddingHorizontal:16,
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
  },
  dateBox: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 36,
    borderRadius: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#6D7074',
    fontWeight: '500',
  },
  dash: {
    marginHorizontal: 12,
    fontSize: 24,
    color: '#999',
  }
  
});

export default StatisticsScreen;

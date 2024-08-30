import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, ActivityIndicator, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { getToken as getTokenApi } from '../api/user';
import { createInvoive as createInvoiveApi, orderCarwash as orderCarwashApi } from '../api/user';
import dayjs from 'dayjs';
import utc from 'dayjs-plugin-utc';
import Cookies from "js-cookie";
import Header from '../components/Header';
import Button from '../components/Button';
import SubmitButton from '../components/SubmitButton';
import FlexHeader from '../components/FlexHeader';

dayjs.extend(utc);
const logoImg = require('../../assets/emu-logo.png');

const OrderScreen = ({ route, navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const { carwash } = route.params;
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [selectedCarTypeId, setSelectedCarTypeId] = useState(null);
  const [selectedWashType, setSelectedWashType] = useState(null);
  const [selectedWashTypeId, setSelectedWashTypeId] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDay, setselectedDay] = useState(new Date());
  const [carTypes, setCarTypes] = useState([]);
  const [washTypes, setWashTypes] = useState([]);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [show, setShow] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [scheduleId, setScheduleId] = useState();
  const [bookings, setBookings] = useState(carwash?.bookings);
  const [bookingId, setBookingId] = useState(null);
  const capacity = carwash?.capacity;
  const [qrCode, setQRCode] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invoiceResponse, setInvoiceResponse] = useState(null);

  const holidays = carwash?.schedules?.holidays || [];
  const getFirstAvailableDay = () => {
    let day = dayjs();
    while (holidays.length > 0 && holidays.includes(day.format("YYYY-MM-DD"))) {
      day = day.add(1, "day");
    }
    return day.format("YYYY-MM-DD");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDay;
    setShow(Platform.OS === 'ios');
    setselectedDay(currentDate);
  };

  const generateTimeSlots = useCallback(
    (startHour, endHour, interval) => {
      const timeSlots = [];
      const today = dayjs();
      let currentTime = dayjs(selectedDay).hour(startHour).minute(0);
      const endTime = dayjs(selectedDay).hour(endHour).minute(0);
      const currentPlusOneHour = today.add(1, "hour");

      while (currentTime.isBefore(endTime)) {
        const start = currentTime.format("HH:mm");
        const end = currentTime.add(interval, "minute").format("HH:mm");

        if (selectedDay === today.format("YYYY-MM-DD") && currentTime.isBefore(currentPlusOneHour)) {
          currentTime = currentTime.add(interval, "minute");
          continue;
        }

        const isDisabled = selectedDay === today.format("YYYY-MM-DD") && currentTime.isBefore(today);

        const slotBookings = bookings
          .filter((booking) => booking.status === "paid")
          .filter((booking) => {
            const bookingDate = dayjs.utc(booking.scheduledTime).format("YYYY-MM-DD");

            if (bookingDate !== selectedDay) return false;

            const bookingStart = dayjs.utc(booking.scheduledTime);
            const bookingEnd = dayjs.utc(booking.endTime);
            const slotStart = dayjs(`${selectedDay} ${start}`, "YYYY-MM-DD HH:mm").utc();
            const slotEnd = dayjs(`${selectedDay} ${end}`, "YYYY-MM-DD HH:mm").utc();

            return !(slotEnd.isBefore(bookingStart) || slotStart.isAfter(bookingEnd));
          }).length;

        const slotIsFull = slotBookings >= capacity;

        timeSlots.push({
          label: `${start} - ${end}`,
          value: `${start} - ${end}`,
          isDisabled: isDisabled || slotIsFull,
          bookingCount: slotBookings,
        });

        currentTime = currentTime.add(interval, "minute");
      }

      return timeSlots;
    },
    [selectedDay, bookings, capacity]
  );

  useEffect(() => {
    if (duration > 0) {
      const schedule = carwash.schedules[0];
      const startHour = dayjs.utc(schedule.startTime).hour();
      const endHour = dayjs.utc(schedule.endTime).hour();
      setTimeSlots(generateTimeSlots(startHour, endHour, duration));
      setScheduleId(schedule.id);
    }
  }, [duration, carwash?.schedules, selectedDay, generateTimeSlots]);

  const showDatepicker = () => {
    setShow(true);
  };

  useEffect(() => {
    const carWashTypes = carwash.carWashTypes;
    const carTypeMap = carWashTypes.reduce((acc, washType) => {
      if (!acc[washType.size]) {
        acc[washType.size] = [];
      }
      acc[washType.size].push(washType);
      return acc;
    }, {});

    const carTypeArray = Object.keys(carTypeMap).map((size) => ({
      label: size,
      value: size,
      washingTypes: carTypeMap[size],
    }));

    setCarTypes(carTypeArray);
    if (carTypeArray.length > 0) {
      setSelectedCarType(carTypeArray[0].value);
      setSelectedCarTypeId(carTypeArray[0].washingTypes[0].serviceId);
      const firstWashType = carTypeArray[0].washingTypes[0];
      setWashTypes(carTypeArray[0].washingTypes.map(washType => ({
        label: washType.type,
        value: washType.type,
        price: washType.price,
        duration: washType.duration,
        id: washType.id // Ensure you have an ID field in your washType
      })));
      setSelectedWashType(firstWashType?.type || "");
      setSelectedWashTypeId(firstWashType?.id || null);
      setPrice(firstWashType?.price || 0);
      setDuration(firstWashType?.duration || 0);
    }
  }, [carwash.carWashTypes]);

  const handleInvoice = async () => {
    // Validate selectedDay and selectedTime
    if (!selectedDay || !selectedTime) {
      Alert.alert('Error', 'Please select a valid date and time.');
      return;
    }
  
    const startTime = selectedTime.split(" - ")[0];
    const endTime = selectedTime.split(" - ")[1];
    const selectedDayString = selectedDay.toISOString().split('T')[0];
  
    const scheduledTime = dayjs(`${selectedDayString}T${startTime}`);
    const endDateTime = dayjs(`${selectedDayString}T${endTime}`);
  
    // Check if the dates are valid
    if (!scheduledTime.isValid() || !endDateTime.isValid()) {
      Alert.alert('Error', 'Invalid date or time selected.');
      return;
    }
    console.log(carwash.id, "carwash id")
    console.log(userInfo.id, "user id")
  
    const orderDetailsData = {
      scheduledTime: scheduledTime.toISOString(),
      carSize: selectedCarType,
      washType: selectedWashType,
      date: scheduledTime.toISOString(),
      endTime: endDateTime.toISOString(),
      price,
      userId: userInfo.id,
      timetable: scheduleId,
      CarWashService: carwash.id,
    };
  
    console.log("Order Details:", orderDetailsData);
    setLoading(true); // Start loading indicator
    try {
      const bookingResponse = await orderCarwashApi(orderDetailsData);
      console.log("Order Details:", bookingResponse);
      const bookingId = bookingResponse.id;
      setBookingId(bookingId);
  
      const tokenResponse = await getTokenApi();
      console.log("Order Details:", tokenResponse);
      const token = tokenResponse.access_token;
      Cookies.set("token", token, { expires: 2, path: "/" });
  
      const invoiceDetails = {
        service: carwash.emuCode,
        token,
        bookingId,
        amount: price,
        description: `Payment for ${selectedWashType} (${selectedCarType}) on ${selectedDayString} at ${startTime}`,
        userId: userInfo.id,
      };
  
      const invoiceResponse = await createInvoiveApi(invoiceDetails);
      setOrderDetails(orderDetailsData);
      setInvoiceResponse(invoiceResponse.data);
      setQRCode(invoiceResponse.qrCode.qr_image);
  
      navigation.navigate('Payment', { invoiceResponse: invoiceResponse, orderDetails: orderDetailsData, bookingId: bookingId });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create booking');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  

  return (
    <View style={styles.container}>
      <FlexHeader headerText='Захиалга хийх' navigation={navigation}/>
      <View style={styles.detail}>

        <View style={styles.detailContainer}>
        <Text style={styles.textDescription}>Угаалгын газар</Text>
          <View style={styles.flex}>
            <Text style={styles.textName}>Нэр</Text>
            <Text style={styles.textLocation}>{carwash.name} </Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.textName}>Байршил</Text>
            <Text style={styles.textLocation}>{carwash.location}</Text>
          </View>
    
        </View>
        <View style={styles.detailContainer}>

          <Text style={styles.textDescription}>Машины төрөл</Text>
          <Dropdown
            style={styles.dropdown}
            data={carTypes}
            labelField="label"
            valueField="value"
            placeholder="Машины төрлөө сонгоно уу."
            iconStyle={styles.iconStyle}
            iconColor='rgba(0, 0, 0, 0.72)'
            value={selectedCarType}
            onChange={item => {
              setSelectedCarType(item.value);
              const selectedCar = carTypes.find(car => car.value === item.value);
              if (selectedCar) {
                setSelectedCarTypeId(selectedCar.washingTypes[0].serviceId);
                const firstWashType = selectedCar.washingTypes[0];
                setWashTypes(selectedCar.washingTypes.map(washType => ({
                  label: washType.type,
                  value: washType.type,
                  price: washType.price,
                  duration: washType.duration,
                  id: washType.id // Ensure you have an ID field in your washType
                })));
                setSelectedWashType(firstWashType?.type || "");
                setSelectedWashTypeId(firstWashType?.id || null);
                setPrice(firstWashType?.price || 0);
                setDuration(firstWashType?.duration || 0);
              }
            }}
          />
        </View>
        <View style={styles.detailContainer}>

          <Text style={styles.textDescription}>Угаалгах төрөл</Text>
          <Dropdown
            style={styles.dropdown}
            data={washTypes}
            labelField="label"
            valueField="value"
            placeholder="Угаах төрлөө сонгоно уу."
            iconStyle={styles.iconStyle}
            iconColor='rgba(0, 0, 0, 0.72)'
            value={selectedWashType}
            onChange={item => {
              setSelectedWashType(item.value);
              const selectedWash = washTypes.find(wash => wash.value === item.value);
              if (selectedWash) {
                setSelectedWashTypeId(selectedWash.id);
                setPrice(selectedWash.price);
                setDuration(selectedWash.duration);
              }
            }}
          />
        </View>
        
        <View style={styles.detailContainer}>

          <Text style={styles.textDescription}>Угаалгах огноо</Text>
          <TouchableOpacity  onPress={showDatepicker}>
            {/* <TextInput
            style={[styles.dropdown, { borderWidth: 0 }]} 
              // label="Date"
              value={selectedDay.toISOString().split('T')[0]}
              right={<FontAwesome name='calendar-o' />}
              mode="outlined"
              editable={false}
              pointerEvents="none"
            /> */}
            <TextInput
              style={styles.dropdown}
              // label="Date"
              value={selectedDay.toISOString().split('T')[0]}
              editable={false}
              pointerEvents="none"
              underlineColorAndroid="#fff" 
            />

          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={selectedDay}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        
        </View>
        <View style={styles.detailContainer}>

          <Text style={styles.textDescription}>Угаалгах цаг</Text>
          <Dropdown
            style={styles.dropdown}
            data={timeSlots.filter(slot => !slot.isDisabled)}
            labelField="label"
            valueField="value"
            placeholder="Цагаа сонгоно уу."
            iconStyle={styles.iconStyle}
            iconColor='rgba(0, 0, 0, 0.72)'
            value={selectedTime}
            onChange={item => {
              setSelectedTime(item.value);
            }}
          />
        
        </View>

        <View style={[styles.detailContainer, styles.priceContainer]}>

          <Text style={styles.priceInfoText}>Үнийн мэдээлэл </Text>
          <Text style={styles.priceInfo}>{price} ₮</Text>
        </View>

        <View style={styles.buttonz}>
          <SubmitButton  onPress={handleInvoice} text={"Захиалах"} />
        </View>
      </View>
   
      {/* <TouchableOpacity style={styles.button} onPress={handleInvoice} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Захиалах</Text>
          
        )}
      </TouchableOpacity> */}
   
   
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
  },
  carwashImg: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dropdown: {
    backgroundColor:"#F4F6F9",
    height: 48,
    // borderColor: 'gray',
    
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
    backgroundColor: '#FFF',
  },
  section1: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  

  paragraph: {
    color: '#323232',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail:{
    paddingTop:16

  },
  detailContainer: {
    // marginLeft: 20,
    marginHorizontal:20,
    marginBottom:16
  },
  textDescription: {
    color: '#323232',
    fontSize: 16,
    fontWeight: '500',
    paddingBottom:10
  },
  parText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',
  },

  flex: {
    paddingBottom:8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  header:{
    
    marginVertical:30,
    // marginBottom:30,
    marginHorizontal:30,
    backgroundColor:'#033669'
    
  },
  flexHeader: {
    padding: 15,
    // paddingBottom:15,
    paddingHorizontal:30,
    paddingRight:20,
    backgroundColor: '#033669',
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:20
  
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
 
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#1E90FF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

priceContainer:{
  marginTop:10,
  marginBottom:25,
  backgroundColor:"#F4F6F9",
  borderRadius:8
},
priceInfoText:{
  // backgroundColor:"#CFCFCF",

  borderTopLeftRadius:10,
  borderTopRightRadius:10,
  textAlign:'center',
  padding:15,
  fontSize:16,
  color:"#000",
  fontWeight:'500'
},
priceInfo:{

  padding:15,
  textAlign:'center',
  fontSize:16,
  backgroundColor:"#fff",
  color:"#000",
  fontWeight:'bold',
  shadowColor: '#C5C5C5',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.23,
  shadowRadius: 8,
  elevation: 2,
},
textLocation: {
  fontSize: 14,
  color:"#8B8E95"


},
textName:{
  fontSize: 14,
  color:"#000",

  
},
buttonz:{
  marginHorizontal:20
},
iconStyle:{
  height:20,
  overflow:'hidden',
},
});

export default OrderScreen;

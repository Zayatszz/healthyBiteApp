import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';
import dayjs from 'dayjs';
import utc from 'dayjs-plugin-utc';
dayjs.extend(utc);
const logoImg = require('../../assets/emu-logo.png');

const OrderScreen = ({ route, navigation }) => {
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
  const capacity = carwash?.capacity;

  const holidays = carwash?.schedules?.holidays || [];
  const getFirstAvailableDay = () => {
    let day = dayjs();
    while (
      holidays &&
      holidays.length > 0 &&
      holidays.includes(day.format("YYYY-MM-DD"))
    ) {
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

        if (
          selectedDay === today.format("YYYY-MM-DD") &&
          currentTime.isBefore(currentPlusOneHour)
        ) {
          currentTime = currentTime.add(interval, "minute");
          continue;
        }

        const isDisabled =
          selectedDay === today.format("YYYY-MM-DD") &&
          currentTime.isBefore(today);

        const slotBookings = bookings
          .filter((booking) => booking.status === "paid")
          .filter((booking) => {
            const bookingDate = dayjs
              .utc(booking.scheduledTime)
              .format("YYYY-MM-DD");

            if (bookingDate !== selectedDay) return false;

            const bookingStart = dayjs.utc(booking.scheduledTime);
            const bookingEnd = dayjs.utc(booking.endTime);
            const slotStart = dayjs(
              `${selectedDay} ${start}`,
              "YYYY-MM-DD HH:mm"
            ).utc();
            const slotEnd = dayjs(
              `${selectedDay} ${end}`,
              "YYYY-MM-DD HH:mm"
            ).utc();

            return !(
              slotEnd.isBefore(bookingStart) || slotStart.isAfter(bookingEnd)
            );
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

  const handleOrder = () => {
    const orderDetails = {
      carType: selectedCarType,
      carTypeId: selectedCarTypeId,
      washType: selectedWashType,
      washTypeId: selectedWashTypeId,
      time: selectedTime,
      date: selectedDay.toISOString().split('T')[0],
      carwash: carwash,
      price: price,
      duration: duration,
    };

    navigation.navigate('Payment', { orderDetails });
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.paragraph}>Угаалгын газрын нэр: {carwash.name}</Text>
        <Text style={styles.paragraph}>Location: {carwash.location}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.paragraph}>Машины төрөл сонгох</Text>
        <Dropdown
          style={styles.dropdown}
          data={carTypes}
          labelField="label"
          valueField="value"
          placeholder="Машины төрлөө сонгоно уу."
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
        <Text style={styles.paragraph}>Угаалгах төрлөө сонгох</Text>
        <Dropdown
          style={styles.dropdown}
          data={washTypes}
          labelField="label"
          valueField="value"
          placeholder="Угаах төрлөө сонгоно уу."
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

      <View style={styles.section}>
        <Text style={styles.paragraph}>Угаалгах огноо</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput
            label="Date"
            value={selectedDay.toISOString().split('T')[0]}
            right={<FontAwesome name='calendar-o' />}
            mode="outlined"
            editable={false}
            pointerEvents="none"
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
        <Text style={styles.paragraph}>Цагаа сонгоно уу.</Text>
        <Dropdown
          style={styles.dropdown}
          data={timeSlots.filter(slot => !slot.isDisabled)}
          labelField="label"
          valueField="value"
          placeholder="Цагаа сонгоно уу."
          value={selectedTime}
          onChange={item => {
            setSelectedTime(item.value);
          }}
        />
        <Text style={styles.paragraph}>Үнийн мэдээлэл: {price}</Text>
        <Text style={styles.paragraph}>Duration: {duration} mins</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOrder}>
        <Text style={styles.buttonText}>Захиалах</Text>
      </TouchableOpacity>
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
});

export default OrderScreen;

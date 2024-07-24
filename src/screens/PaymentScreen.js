// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import CarWashItem from '../components/CarWashItem';
// import { fetchCarwashList as fetchCarwashListApi } from '../../api/user';
// import { Dropdown } from 'react-native-element-dropdown';
// import { AuthContext } from '../../context/AuthContext';
// import { orderCarwash as orderCarwashApi } from '../../api/user';

// const logoImg = require('../../assets/emu-logo.png');




// const PaymentScreen = ({ route, navigation }) => {
//   const { userInfo } = useContext(AuthContext);
//   const { orderDetails } = route.params;
//   const [loading, setLoading] = useState(false);

//   const handleInvoice = async () => {
//     setLoading(true);

//     // Log the orderDetails for debugging
//     console.log("Order Details:", orderDetails);

//     try {
//       // Properly handle the time and date formatting
//       const [startHour] = orderDetails.time.split('-')[0].split(':');
//       const startDateTime = new Date(orderDetails.date);
//       startDateTime.setHours(parseInt(startHour, 10), 0, 0, 0); // Set hours, minutes, seconds, and milliseconds

//       const endDateTime = new Date(startDateTime);
//       endDateTime.setHours(startDateTime.getHours() + 1); // Assuming 1 hour duration

//       // Log the formatted dates for debugging
//       console.log("Start DateTime:", startDateTime.toISOString());
//       console.log("End DateTime:", endDateTime.toISOString());

//       const orderDetailsData = {
//         scheduledTime: startDateTime.toISOString(),
//         carWashTypeId: orderDetails.washTypeId || 1, // Ensure this field is not undefined
//         washType: orderDetails.washType,
//         carSize: orderDetails.carType,
//         date: startDateTime.toISOString().split('T')[0], // Date without time
//         endTime: endDateTime.toISOString(),
//         paymentDetail: "Pending",
//         price: orderDetails.price || 0, // Ensure this field is not undefined
//         status: "pending",
//         timetableId: orderDetails.timetableId || 1, // Ensure this field is not undefined
//         userId: userInfo.id,
//         carWashServiceId: orderDetails.carwash.id,
//         carNumber: orderDetails.carNumber || "", // Ensure this field is not undefined
//       };

//       // Log the orderDetailsData for debugging
//       console.log("Order Details Data:", orderDetailsData);

//       const response = await orderCarwashApi(orderDetailsData);

//       Alert.alert('Success', 'Booking created successfully');
//       navigation.navigate('MyOrders'); // Replace with your success screen
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to create booking');
//     } finally {
//       setLoading(false);
//     }
//   };



//   return (
//     <View style={styles.container}>
//       <View style={styles.section}>
//         <Text style={styles.paragraph}>Угаалгын газрын нэр: {orderDetails.carwash.name}</Text>
//         <Text style={styles.paragraph}>Location: {orderDetails.carwash.location}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.paragraph}>Машины төрөл</Text>
//         <Text style={styles.paragraph}>{orderDetails.carType}</Text>
//         <Text style={styles.paragraph}>Угаалгах төрөл</Text>
//         <Text style={styles.paragraph}>{orderDetails.washType}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.paragraph}>Угаалгах огноо</Text>
//         <Text style={styles.paragraph}>{orderDetails.date}</Text>
//         <Text style={styles.paragraph}>Цаг</Text>
//         <Text style={styles.paragraph}>{orderDetails.time}</Text>
//         <Text style={styles.paragraph}>Үнэ</Text>
//         <Text style={styles.paragraph}>{orderDetails.price}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.paragraph}>Банкны qpay үйлчилгээ ашиглан төлбөр төлөх холбоосууд харагдана.</Text>
//       </View>
//       <TouchableOpacity style={styles.button} onPress={handleInvoice} disabled={loading}>
//         <Text style={styles.buttonText}>{loading ? 'Loading...' : 'okkkk'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };







// const styles = StyleSheet.create({
//     section:{
//         backgroundColor:'#fff',
//         marginHorizontal:20,
//         marginTop:20,
//         padding:20,
//     }, 
//     carwashImg:{
//         // width:280,
//         height:200,
//         borderTopLeftRadius:10,
//         borderTopRightRadius:10,
//     },
//     dropdown: {
//         height: 50,
//         borderColor: 'gray',
//         borderWidth: 0.5,
//         borderRadius: 8,
//         paddingHorizontal: 8,
//       },
//   searchBar: {
//     padding: 10,
//     marginRight: 30,
//     backgroundColor: '#000',
//     width: '100%',
//   },
//   view: {
//     margin: 10,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#066BCF',
//   },
//   section1: {
//     paddingTop: 60,
//     paddingBottom: 60,
//     paddingHorizontal: 20,
//   },
//   sectionTitle: {
//     fontSize: 50,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#FFF',
//   },
//   paragraph: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     // textAlign: 'center',
//     // color: '#FFF',
//   },
//   parText: {
//     fontSize: 20,
//     textAlign: 'center',
//     color: '#FFF',
//   },
//   flexHeader: {
//     padding: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#066BCF',
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   flex: {
//     padding: 10,
//     paddingHorizontal: 20,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   flexz: {
//     flexDirection: 'row',
//     padding: 5,
//     alignItems: 'center',
//   },
//   allBtn: {
//     width: 120,
//     height: 40,
//     backgroundColor: '#58B3F0',
//     borderRadius: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#C0C0C0',
//   },
//   logoImg: {
//     width: 70,
//     height: 60,
//     borderRadius: 10,
//   },
//   CarWashItem: {
//     paddingHorizontal: 20,
//   },
//   addWrapper: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#58B3F0',
//     borderRadius: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#18A0FB',
//     borderWidth: 1,
//   },
//   addText: {
//     fontWeight: 'bold',
//     color: '#000',
//     fontSize: 18,
//   },

//   button: {
//     width: '100%',
//     height: 45,
//     backgroundColor: '#1E90FF',
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default PaymentScreen;
















  // const handleInvoice = async () => {
  //   setLoading(true);

  //   // Log the orderDetails for debugging
  //   console.log("Order Details:", orderDetails);

  //   try {
  //     // Properly handle the time and date formatting
  //     const [startHour] = orderDetails.time.split('-')[0].split(':');
  //     const startDateTime = new Date(orderDetails.date);
  //     startDateTime.setHours(parseInt(startHour, 10), 0, 0, 0); // Set hours, minutes, seconds, and milliseconds

  //     const endDateTime = new Date(startDateTime);
  //     endDateTime.setHours(startDateTime.getHours() + 1); // Assuming 1 hour duration

  //     // Log the formatted dates for debugging
  //     console.log("Start DateTime:", startDateTime.toISOString());
  //     console.log("End DateTime:", endDateTime.toISOString());

  //     const orderDetailsData = {
  //       scheduledTime: startDateTime.toISOString(),
  //       carWashTypeId: orderDetails.washTypeId || 1, // Ensure this field is not undefined
  //       washType: orderDetails.washType,
  //       carSize: orderDetails.carType,
  //       date: startDateTime.toISOString().split('T')[0], // Date without time
  //       endTime: endDateTime.toISOString(),
  //       paymentDetail: "Pending",
  //       price: orderDetails.price || 0, // Ensure this field is not undefined
  //       status: "pending",
  //       timetableId: orderDetails.timetableId || 1, // Ensure this field is not undefined
  //       userId: userInfo.id,
  //       carWashServiceId: orderDetails.carwash.id,
  //       carNumber: orderDetails.carNumber || "", // Ensure this field is not undefined
  //     };

  //     // Log the orderDetailsData for debugging
  //     console.log("Order Details Data:", orderDetailsData);

  //     const response = await orderCarwashApi(orderDetailsData);

  //     Alert.alert('Success', 'Booking created successfully');
  //     navigation.navigate('MyOrders'); // Replace with your success screen
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('Error', 'Failed to create booking');
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { getBookingStatus as getBookingStatusApi } from '../../api/user';

const PaymentScreen = ({ route, navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const { invoiceResponse, orderDetails, bookingId } = route.params;

  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [qrCode, setQRCode] = useState("");

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        console.log("Checking booking status for booking ID:", bookingId);
        const bookingStatus = await getBookingStatusApi(bookingId);
        console.log("Booking status:", bookingStatus);
        if (bookingStatus === "paid") {
          Alert.alert("Төлбөр амжилттай төлөгдлөө.");
          setPaymentStatus("paid"); // Update paymentStatus to "paid"
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error checking booking status:", error);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [bookingId]);

  useEffect(() => {
    if (invoiceResponse && invoiceResponse.qrCode) {
      try {
        const qrDataUrl = `data:image/png;base64,${invoiceResponse.qrCode.qr_image}`;
        setQRCode(qrDataUrl);
      } catch (error) {
        console.error("Error decoding QR code:", error);
      }
    }
  }, [invoiceResponse]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.paragraph}>Угаалгын газрын нэр: {orderDetails?.name}</Text>
        <Text style={styles.paragraph}>Location: {orderDetails?.location}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.paragraph}>Машины төрөл</Text>
        <Text style={styles.paragraph}>{orderDetails.carSize}</Text>
        <Text style={styles.paragraph}>Угаалгах төрөл</Text>
        <Text style={styles.paragraph}>{orderDetails.washType}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.paragraph}>Угаалгах огноо</Text>
        <Text style={styles.paragraph}>{orderDetails.date}</Text>
        <Text style={styles.paragraph}>Цаг</Text>
        <Text style={styles.paragraph}>{orderDetails.date} - {orderDetails.endTime}</Text>
        <Text style={styles.paragraph}>Үнэ</Text>
        <Text style={styles.paragraph}>{orderDetails.price}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.paragraph}>Банкны qpay үйлчилгээ ашиглан төлбөр төлөх холбоосууд харагдана.</Text>
        {qrCode ? (
          <Image source={{ uri: qrCode }} style={styles.qrCode} />
        ) : (
          <Text>Loading QR Code...</Text>
        )}
      </View>
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
  qrCode: {
    width: 200,
    height: 200,
    alignSelf: 'center',
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

export default PaymentScreen;

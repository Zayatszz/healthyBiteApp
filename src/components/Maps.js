
// import React from 'react';
// import { View, StyleSheet, Platform, Pressable, Text } from 'react-native';
// import Animated, { FadeIn } from 'react-native-reanimated';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MapView from 'react-native-maps';

// const Maps = ({ navigation }) => {
//     const insets = useSafeAreaInsets();
//     return (
//         <MapView
//         style={styles.map}
//             initialRegion={{
//                 latitude: 37.78825,
//                 longitude: -122.4324, 
//             }}
//         />
//     );
// };

// const styles = StyleSheet.create({
//   map: {
//     width: '100%',
//     height: 200, 
//   },
// });
// export default Maps;



import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Maps = ({ latitude = 37.78825, longitude = -122.4324 }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* <Marker
        coordinate={{ latitude: latitude, longitude: longitude }}
        title="Car Wash Location"
        description="This is where the car wash is located."
      /> */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 200, // Adjust the height as needed
    // marginVertical:10,

  },
});

export default Maps;

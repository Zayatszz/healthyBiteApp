// // Skeleton.js
// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { MotiView } from 'moti';

// const Skeleton = () => {
//   return (
//     <MotiView
//       from={{ opacity: 0.3 }}
//       animate={{ opacity: 1 }}
//       transition={{
//         type: 'timing',
//         duration: 1000,
//         loop: true,
//         repeatReverse: true,
//       }}
//       style={styles.skeleton}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   skeleton: {
//     width: '100%',
//     height: 20,
//     backgroundColor: '#E1E9EE',
//     borderRadius: 4,
//     marginVertical: 8,
//   },
// });

// export default Skeleton;

// Skeleton.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

const Skeleton = ({ style }) => {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 1000,
        loop: true,
        repeatReverse: true,
      }}
      style={[styles.skeleton, style]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    marginVertical: 8,
  },
});

export default Skeleton;


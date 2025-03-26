import React from 'react';
import { View, StyleSheet, Platform, Pressable, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const Header = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    return (
        <Animated.View
            entering={FadeIn.delay(400)}
             style={[styles.container, { top: Platform.OS === 'ios' ? insets.top : 20 }]}>
            <Pressable onPress={() => navigation.goBack()}>
                <Feather name='chevron-left' style={styles.icon} />
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1
    },
    icon: {
        fontSize: 24,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 50,
        color: '#000',
        marginLeft: 10
    }
});

export default Header;

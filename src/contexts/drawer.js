import { createContext, useState } from 'react'
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const DrawerContext = createContext({
    toggleDrawer: () => { },
    animatedValue: null
})

export const useNavigatorAnimationHooks = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const animatedValue = useState(new Animated.Value(0))[0];

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * 0.4], // Main page moves to 60% of screen width
    });

    const drawerTranslateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width * 0.4, 0], // Drawer slides in
    });

    const scale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.9]
    });

    const rotateZ = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-5deg'], // Slants the main page
    });

    const animatedDrawerStyle = {
        transform: [{ translateX: drawerTranslateX }],
    }

    const animatedPageStyle = {
        transform: [{ translateX }, { scale }, { rotateZ }],
    }

    const toggleDrawer = () => {
        if (drawerOpen) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setDrawerOpen(false));
        } else {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setDrawerOpen(true));
        }
    };

    return {
        animatedPageStyle,
        animatedDrawerStyle,
        toggleDrawer
    }
}

const DrawerContextProvider = ({ children }) => {
    const animationValues = useNavigatorAnimationHooks()

    return <DrawerContext.Provider value={animationValues}>
        {children}
    </DrawerContext.Provider>
}

export default DrawerContextProvider
import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Animated,
    Dimensions
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
    useNavigationBuilder,
    TabRouter,
    TabActions,
} from '@react-navigation/native';

import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import DrawerContextProvider, { DrawerContext } from '../contexts/drawer'

import { createMyNavigator } from './utility'

const { width } = Dimensions.get('window');

function TabNavigator({
    id,
    initialRouteName,
    children,
    layout,
    screenListeners,
    screenOptions,
    screenLayout,
    tabBarStyle,
}) {

    const { animatedPageStyle, animatedDrawerStyle, toggleDrawer } = useContext(DrawerContext)
    const { state, navigation, descriptors, NavigationContent } =
        useNavigationBuilder(TabRouter, {
            id,
            initialRouteName,
            children,
            layout,
            screenListeners,
            screenOptions,
            screenLayout,
        });

    return (
        <NavigationContent>
            <Animated.View style={[styles.drawer, animatedDrawerStyle]}>
                <View style={styles.tabBarStyle}>
                    <Pressable
                        key={'sign out'}
                        onPress={() => {

                        }}
                        style={styles.routesContainer(false)}
                    >
                        <Text style={styles.routesText(false)}>Header Text</Text>
                    </Pressable>
                </View>
                <View style={[styles.tabBarStyle, tabBarStyle]}>
                    {state.routes.map((route, index) => {
                        const isFocused = state.index === index;
                        return (
                            <Pressable
                                key={route.key}
                                onPress={() => {
                                    const event = navigation.emit({
                                        type: 'tabPress',
                                        target: route.key,
                                        canPreventDefault: true,
                                    });

                                    if (!isFocused && !event.defaultPrevented) {
                                        navigation.dispatch({
                                            ...TabActions.jumpTo(route.name, route.params),
                                            target: state.key,
                                        });
                                        toggleDrawer()
                                    }
                                }}
                                style={styles.routesContainer(isFocused)}
                            >
                                <Text style={styles.routesText(isFocused)}>{descriptors[route.key].options.title ?? route.name}</Text>
                            </Pressable>
                        )
                    })}
                </View>
                <View style={styles.tabBarStyle}>
                    <Pressable
                        key={'sign out'}
                        onPress={() => {

                        }}
                        style={styles.routesContainer(false)}
                    >
                        <Text style={styles.routesText(false)}>Sign Out</Text>
                    </Pressable>
                </View>
            </Animated.View>
            <Animated.View style={[styles.main, animatedPageStyle]}>
                {state.routes.map((route, i) => {
                    return (
                        <View
                            key={route.key}
                            style={[
                                StyleSheet.absoluteFill,
                                { display: i === state.index ? 'flex' : 'none' },
                            ]}
                        >
                            {descriptors[route.key].render()}
                        </View>
                    );
                })}
            </Animated.View>
        </NavigationContent>
    );
}

const MyNavigator = createMyNavigator(TabNavigator);

const MyTabs = () => {

    return (
        <NavigationContainer>
            <DrawerContextProvider >
                <MyNavigator.Navigator>
                    <MyNavigator.Screen name="Home" component={HomeScreen} />
                    <MyNavigator.Screen name="Profile" component={ProfileScreen} />
                </MyNavigator.Navigator>
            </DrawerContextProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
    },
    routesContainer: (isFocused) => ({
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: isFocused ? '#FFF' : 'transparent',
        height: 30,
        padding: 20,
        borderRadius: 5
    }),
    routesText: (isFocused) => ({
        height: 30,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color: isFocused ? '#333' : '#FFF',
        textAlignVertical: 'center'
    }),
    drawer: {
        position: 'absolute',
        width: width * 0.35,
        height: '100%',
        backgroundColor: '#333',
        padding: 10,
        justifyContent: 'center',
    },
    tabBarStyle: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    drawerText: {
        color: '#fff',
        fontSize: 20,
    },
    main: {
        flex: 1,
        backgroundColor: '#fff',
        zIndex: 1,
    },
    menuButton: {
        padding: 20,
    },
    menuText: {
        fontSize: 30,
    },
    mainText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default MyTabs
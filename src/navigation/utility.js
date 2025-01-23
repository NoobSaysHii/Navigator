import { createNavigatorFactory } from '@react-navigation/native';

export const createMyNavigator = (navigator, config) => {
    return createNavigatorFactory(navigator)(config);
}
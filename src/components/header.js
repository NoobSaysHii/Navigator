import { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { DrawerContext } from '../contexts/drawer';

const Header = ({ title = ''}) => {
    const { toggleDrawer } = useContext(DrawerContext)
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
                <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.menuText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
    },
    menuButton: {
        padding: 20,
    },
    menuIcon: {
        fontSize: 30,
    },
    menuText: {
        fontSize: 20,
        textAlignVertical: 'center',
    },
});

export default Header
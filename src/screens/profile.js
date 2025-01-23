import {
    View,
    StyleSheet
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../components/header';

const ProfileScreen = ({ }) => {
    const { name } = useRoute();
    return (
        <View style={styles.container}>
            <Header title={name} />
            <View style={styles.content}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    content: {
        display: 'flex',
        flex: 1,
        padding: 20
    }
});

export default ProfileScreen
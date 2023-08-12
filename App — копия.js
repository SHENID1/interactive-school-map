import {View, StyleSheet, StatusBar, Platform, TextInput} from 'react-native';
import Map from "./components/floor/map";

const App = () => {

    return (
        <View style={style.AndroidSafeArea}>
            <TextInput/>
            <Map/>
        </View>
    );
};
const style = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
    }
});


export default App;
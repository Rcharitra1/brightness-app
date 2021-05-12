import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const MainButton = props =>{
    return(
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={styles.buttonText}>
                {props.children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'purple',
        paddingVertical:12,
        paddingHorizontal:30,
        borderRadius:6,
        marginVertical:10
    },
    buttonText:{
        color:'white',
        fontSize:18
    }
})

export default MainButton;
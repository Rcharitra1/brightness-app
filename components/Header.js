import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Header = (props)=>{
    return(
        <View style={{...styles.header,...props.style }}>
            <Text style={styles.titleText}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        backgroundColor:'purple',
        height:90,
        width:'100%',
        paddingTop:36,
        justifyContent:'center',
        alignContent:'center'

    },
    titleText:{
        color: 'white',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:22
    }

});

export default Header;
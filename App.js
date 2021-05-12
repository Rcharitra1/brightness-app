
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';;
import * as Brightness from 'expo-brightness';
import MainButton from './components/MainButton';
import Header from './components/Header';



export default function App() {

  const[isOn, setIsOn] = useState(true);
  const [isBrightnessFull, setIsBrightnessFull]=useState('Power Down');
  const [isAnimateFull, setIsAnimatedFull]=useState('Animate Down');
 
  useEffect(()=>{
    (async ()=>{
      const {status} = await Brightness.requestPermissionsAsync();
      if(status=='granted')
      {
        Brightness.setSystemBrightnessAsync(1);
      }  
    })();
  }, [])

  const changeText = ()=>{
    if(!isOn)
    {
      setIsBrightnessFull('Power Down');
      setIsAnimatedFull('Animate Down');
    }else
    {
      setIsAnimatedFull('Animate Up');
      setIsBrightnessFull('Power Up');
    }
  }


  //this will instantly decreease/increase brightness on the device
  const increaseScreenBrightness=()=>
  {
    setIsOn(!isOn);
    (async ()=>{
      //Will require user permission on the device to access Brightness
      const {status} = await Brightness.requestPermissionsAsync();
      if(status=='granted')
      { 
          !isOn?  
          Brightness.setSystemBrightnessAsync(1) : Brightness.setSystemBrightnessAsync(0);
      }
    })();
    changeText();

  } 

  //This will gradually dim and increase brightness

 const animatedIncreaseScreenBrightness=()=>
 {
  const timer = ms => new Promise(res => setTimeout(res, ms));

  async function load () 
  { 
   
    const val = isOn;
   const {status} = await Brightness.getPermissionsAsync();
   if(!val)
   {
    for (var i = 0; i < 1; i+=0.1) {
      Brightness.setBrightnessAsync(i);
     await timer(25);
    }
   }
   if(val){
  for (var i = 1; i > 0.1; i-=0.1) {
    Brightness.setBrightnessAsync(i);
   await timer(25);
  }
    }

    setIsOn(!val);
   }
 
   load();
   changeText();
 
 }


  
  return (
       
    <View style={styles.container}>
   
    <Header title={'Brightness App'}/>
    <View style={styles.screen}>
    <Text style={styles.title}>Brightness Control App</Text>
    <MainButton style={styles.buttonStyle} onPress={increaseScreenBrightness}>{isBrightnessFull}</MainButton>
    <MainButton style={styles.extra} onPress={animatedIncreaseScreenBrightness}>{isAnimateFull}</MainButton>
    </View>
      </View>
  );


 

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen:{
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize:22,
    fontWeight:'900',
    color:'purple',
    marginVertical:40
  },
  buttonStyle:{
    maxWidth:'70%',
    width:250,
    alignItems:'center'

  },
  extra:{
    backgroundColor:'lightgreen',
    maxWidth:'70%',
    width:250,
    alignItems:'center'
  }
});


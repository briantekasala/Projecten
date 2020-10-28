import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';



kleuren = {
  color :[
    {'naam':'#FF0000'},
    {'naam':'#FF7F00'},
    {'naam':'#FFFF00'},
    {'naam':'#00FF00'},
    {'naam':'#0000FF'},
    {'naam':'#2E2B5F'},
    {'naam':"#8B00FF"},


    {'naam':'#FF6663'},
    {'naam':'#FEB144'},
    {'naam':'#FDFD97'},
    {'naam':'#9EE09E'},
    {'naam':'#9EC1CF'},
    {'naam':'#CC99C9'},
    
  ]
}
let indexOpteller={};



let itemletters =['r','a','i','n','b','o','w']
let item =[]
for (let index = 0; index <7; index++) {
  
  item.push(kleuren.color[0].naam) 
}


export const Rainbow =(props)=> {

  indexOpteller.getal =0;
  (props.change%2==0)? indexOpteller.getal=6: indexOpteller.getal = 0;

  return(
    item.map((color,index)=> <Text style={{backgroundColor:kleuren.color[(index + indexOpteller.getal)].naam,paddingTop:5, width:props.breedt,height:props.hoogte,marginLeft:props.links}}>{index+indexOpteller.getal}</Text>)
  )
}



export const Letter = (props) => {
  
  return (
  
  itemletters.map((color,index)=><Text style={{color:kleuren.color[index+indexOpteller.getal].naam, fontSize:40 }}> {props.name.charAt(index)}</Text>)

  )
}

export const Footer = (props) =>{
  
  return ( <View style={styles.footer}>
    <Letter style={styles.streep} name= {props.naam} />
  </View>)
 
}


export default function App() {
 const [klik,SetKlik] = useState(1);
 const [tekts , setTekst] = useState('Rainbow');
  
  return (
  <View style={styles.container}>

    <View style={styles.header}>
    <Rainbow change={klik} />
    <TextInput onChangeText={tekts=> setTekst(tekts)}></TextInput>
    <Button color='#ff5c5c' title='change color' onPress={()=> SetKlik(klik=>{return klik += 1})  } ></Button>
   </View>
    
    <View style={styles.main}>

    <View style={styles.links}>
    <Rainbow change={klik} />
    </View>

    <View style={styles.rechts}>
    <Rainbow change ={klik} breedt={50} hoogte={50} links={50}/>
    </View>

    </View>


   <Footer naam ={tekts} />
    </View>
  
  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:"column"
  },

  header:{
    height:100,
    flex:1,
    flexDirection:'column',
    paddingBottom:75
    
  },

  main:{
    height:100,
    flex:3,
    flexDirection:'row',
  },

  links:{
    flex:2,
    flexDirection:"row",
    justifyContent:"space-around",
    
  },

  rechts:{
    flexDirection:'column',
    flex:2,
    justifyContent:"space-around",
    
  },

  footer:{
    height:100,
   flexDirection:'row',
    flex:1,
    justifyContent:'center',
   
    marginTop:10,
    marginBottom:15,
   

  },

  streep: {
   
  }




 
  
});


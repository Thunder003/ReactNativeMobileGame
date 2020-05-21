import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/header';
import Firstscreen from './screens/firstscreen';
import Gamescreen from './screens/gamescreen';
import Gameover from '../screens/gameover';

export default function App() {
  const [useNumber, setuseNumber]=useState();
  const [guessround, setguessround]=useState(0);

  const configure=()=>{
    setguessround(0);
    setuseNumber(null); 
  }

  const startgame=(selectednum)=>{
    setuseNumber(selectednum);  
    setguessround(0);
  }

  const gameover=numberofrounds=>{
    setguessround(numberofrounds);
  }
  let content=<Firstscreen onstart={startgame}/>;

  if(useNumber && guessround<=0)
  {
    content= <Gamescreen userchoice={useNumber} ongameover={gameover}/>;
  }else if(guessround>0){
      content=<Gamescreen roundNumber={guessround } useNumber={useNumber} onRestart={configure}/>;
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
     {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});

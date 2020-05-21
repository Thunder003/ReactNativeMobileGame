import React , {useState, useRef,useEffect}from 'react';
import {View,Text, StyleSheet, Button,Alert} from 'react-native';
import Numbercontainer from '../components/numbercontainer';
import Card from './card';


const generaterandombetween=(min,max,exclude)=>{
	min=Math.ceil(min);
	max=Math.ceil(max);
	const randNum=Math.floor(Math.random()*(max-min))+min;
	if(randNum==exclude)
	{
		return generaterandombetween(min,max,exclude);
	}
	else
	{
		return randNum;
	}
}

const {userchoice,ongameover}=props;

const Gamescreen=(props)=>{
	const [currentGuess,setcurrentGuess]=useState(generaterandombetween(1,100,props.userchoice));
	const [rounds,setrounds]=useState(0);
	const currentLow=useRef(1);
	const currentHigh=useRef(100);
	useEffect(()=>{
		if(currentGuess===userchoice){
			ongameover(rounds	);
		}
	}, [currentGuess,userchoice, ongameover])


const nextguess=(direction)=>{
	if((direction==='lower' && currentGuess<props.userchoice) || (direction==='greater' && currentGuess>props.userchoice))
	{
		Alert.alert('Do not lie','You know that that is wrong', [{text:'Sorry!', style:'cancel'}]);
		return;
	}
	if(direction==='lower')
	{
		currentHigh.current=currentGuess;
	}
	else
		{
			currentLow.current=currentGuess;
		}
	const nextnum=generaterandombetween(currentLow.current,currentHigh.current,currentGuess);
	setcurrentGuess(nextnum);
	setrounds(curRounds=>curRounds+1);	
}

	return(

		<View style={styles.screen}>
			<Text>Opponents Output</Text>
			<Numbercontainer>{currentGuess}</Numbercontainer>
			<Card style={styles.buttoncon}>
			<Button title="LOWER" onPress={nextguess.bind(this,'lower')}/>
			<Button title="HIGHER" onPress={nextguess.bind(this,'greater')}/>
			</Card>
		</View>
		);
};

const styles=StyleSheet.create({
	screen:{
		flex:1,
		padding:10,
		alignItems:'center'
	},
	buttoncon:{
		flexDirection:'row',
		justifyContent:'space-around',
		marginTop:20,
		width:300,
		maxWidth:'80%'
	}

});

export default Gamescreen;
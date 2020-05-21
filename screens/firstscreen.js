import React, {useState} from 'react';
import {View,Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback,keyboard, Alert} from 'react-native';
import Card from './card';
import Colors from '../constants/colors';
import Input from '../components/input';
import Numbercontainer from '../components/numbercontainer';


const Firstscreen=props=>
{
	const [enternum, setenternum]=useState('');
	const [confirm, setconfirm]=useState(false);
	const [selectedNum, setselectedNum]=useState(); 

	const numberHandler=inputtext=>{
		setenternum(inputtext.replace(/[^0-9]/g,''));
	}

	const resetinput=()=>{
		setenternum('');
		setconfirm(false);
	}

	const confirminput=()=>{
		const choosenNumber=parseInt(enternum);
		if( choosenNumber<=0 || choosenNumber>99)
		{
			Alert.alert("Invalid", "Number has to be between 0-99", [{text:'okay', style:'destructive',onPress:resetinput}]);
			return;
		}
		setconfirm(true);
		setselectedNum(choosenNumber);
		setenternum('');
	}

	let confirmoutput;

	if(confirm)
	{
		confirmoutput=(
		<Card style={styles.summaryContainer}>
			<Text>You Selected</Text>
			<Numbercontainer>{selectedNum}</Numbercontainer>
			<Button title="START GAME!!!" onPress={()=>props.onstart(selectedNum)}/>
		</Card>
		)
	}

	return (
		<TouchableWithoutFeedback>
			<View style={styles.screen}>
			<Text style={styles.title}>Game</Text>
			<Card style={styles.inputcont}>
				<Text>Enter a Number</Text>
				<Input onChangeText={numberHandler} value={enternum} style={styles.input} blurOnSubmit autoCapitalize='none' keyboardType="number-pad" maxLength={2}/>
				<View style={styles.buttonContainer}>
				<View style={styles.button}><Button title="Reset" onPress={resetinput} color={Colors.primary}/></View>
				<View style={styles.button}><Button title="Confirm" onPress={confirminput} color={Colors.secondary}/></View>
				</View>
			</Card>
			{confirmoutput}
			</View>
			</TouchableWithoutFeedback>
		);
};

const styles=StyleSheet.create({
	screen:{
		flex:1,
		padding:10,
		alignItems:'center'
	},
	buttonContainer:{
		flexDirection:'row',
		width:'100%',
		justifyContent:'space-between',
		paddingHorizontal:15
	},
	inputcont:{
		width:300,
		maxWidth:'80%',
		alignItems:'center',
	},
	title:{
		fontSize:20,
		marginVertical:10
	},
	button:
	{
		width:'40%'
	},
	input:{
		width:30,
		textAlign:'center'
	},
	summaryContainer:{
		marginTop:20,
		alignItems:'center'
	}
});

export default Firstscreen;
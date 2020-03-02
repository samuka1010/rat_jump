import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import Grass from './Grass.js';

export default function App() {
  const [ratJump] = useState(new Animated.Value(520));
  const [boxScroll] = useState(new Animated.Value(450));
  const [isDead, setDead] = useState(false)
  const [isStart, setStart]= useState(false)
  const [score, setScore] = useState(0)
  const boxes = [1000,3000,4000,6000];
  var delay = 1000;
  var boxScrollv = 0;
  var ratScrollv = 0;
  var isJumping = false;
  var canScore = true;
  var scoreg = 0;

  function colisionSensor() {	
	    //if (!isDead) {  
			if ((boxScrollv >= 60) && (boxScrollv < 140)) {
				//console.log(`boxScroll: ${boxScrollv}`)
				if ((ratScrollv > 515) || (ratScrollv == 0)) {
					//console.log(`ratJump: ${ratScrollv}`)
					canScore = false;
					boxScroll.removeAllListeners();
					boxScroll.stopAnimation();
					setDead(true)
				}
			}	
			//console.log(`boxScroll: ${boxScrollv}`)
			if ( (boxScrollv < -30) && (canScore)){
				//console.log(`score: ${score}`)
				scoreg++
				setScore(scoreg)	
				canScore = false			
			}
			if (boxScrollv >= 400){
				canScore = true;
			}
		//}
  }

  function _reset() {
	    scoreg = -1
	    canScore = false
		Animated.timing(
			boxScroll,
			{
				toValue: -60,
				duration: 0,
				useNativeDriver: true
			}
		).start(() => {setDead(false);_start()})	
  }

  function _start() {
	setStart(true)
	setScore(scoreg)
	canScore = true
	ratJump.addListener(({value}) => {ratScrollv = Math.floor(value)})
	boxScroll.addListener(({value}) => {boxScrollv = Math.floor(value);colisionSensor()});
	generateBoxes(false);
  }

  function _jump() {
	if (!isJumping){
		isJumping = true
		Animated.sequence([	
			Animated.timing(
				ratJump,
				{
					toValue: 400,
					duration: 400,
					useNativeDriver: true	
				}
			),
			Animated.timing(
				ratJump,
				{
					toValue: 520,
					duration: 300,
					useNativeDriver: true
				}
			), 
			
		]).start(() => isJumping = false);
	}
  }

  function generateBoxes(isDeads){
	
	Animated.loop(
		Animated.sequence([
			Animated.timing(
				boxScroll,
				{
					toValue: -60,
					easing: Easing.linear,
					duration: 3050,
					useNativeDriver: true
				}
			),	
			Animated.timing(
				boxScroll,
				{
					toValue: 450,
					duration: 0,
					useNativeDriver: true
				}
			),
			Animated.delay(delay)
		])
	).start()
	
  }

  return (
	
	<TouchableWithoutFeedback onPress={isDead? _reset : !isStart? _start :_jump}>
		<View style={styles.container}>	
			{isDead?
			<View>
				<Text style={styles.isDead}>Você morreu =(</Text>
				<Text style={styles.score}>Score: {score}</Text>
			</View>
			: 
			!isStart?
			<View>
				<Text style={styles.isDead}>Toque para iniciar</Text>
			</View>
			:
			<View>
			<Text style={styles.isDead}>Score: {score}</Text>
			</View>
			}
			<Animated.View style={{position: 'absolute', translateY: ratJump, translateX: -40}}>
				<Image source={require('./assets/rat.gif')} 
					style={styles.rat}
				/>
			</Animated.View>

			<Animated.View style={{position: 'absolute', translateY: 683, translateX: boxScroll}}>
				<Image source={require('./assets/box.png')} style={styles.box}/>
			</Animated.View>

			<Grass/>	
		</View>
	</TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ccc',
	},
	rat: {
		width: 300, 
		height: 340,
		position: 'absolute'
	},
	box: {
		width: 45, 
		height: 45,
		position: 'absolute'
	},
	isDead: {
		color: 'red',
		fontSize: 30,
		fontFamily: 'monospace',
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: '80%'
	},
	score: {
		color: 'black',
		fontSize: 30,
		fontFamily: 'monospace',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

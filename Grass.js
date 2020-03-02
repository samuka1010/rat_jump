import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

export default function Grass() {
	const [scroll1, setScroll1] = useState(new Animated.Value(0)); //to -750
	const [scroll2, setScroll2] = useState(new Animated.Value(750)); //to 0

	function _reinicia1(){}

	function _animate() {		
		Animated.loop(
			Animated.sequence([
				Animated.parallel([
					Animated.timing( 
						scroll1,
						{
							toValue: 0,
							duration: 0,
							easing: Easing.linear,
							useNativeDriver: true						
						}
					),
					Animated.timing( 
						scroll2,
						{
							toValue: 750,
							duration: 0,
							easing: Easing.linear,
							useNativeDriver: true						
						}
					),
				]),
				Animated.parallel([
					Animated.timing( 
						scroll1,
						{
							toValue: -750,
							duration: 4500,
							easing: Easing.linear,
							useNativeDriver: true						
						}
					),	
					Animated.timing( 
						scroll2,
						{
							toValue: 0,
							duration: 4500,
							easing: Easing.linear,
							useNativeDriver: true
						}
					),	
				]),
			])
		).start()			
	}

	useEffect(() => {
		_animate()
	})	

	return (
		<View style={{flex: 1}}>
			<Animated.View style={{position: 'absolute', translateX: scroll1, bottom: 0}}>
				<Image source={require('./assets/grassbig.png')} style={styles.png1 } />
			</Animated.View>
			<Animated.View style={{position: 'absolute', translateX: scroll2, bottom: 0}}>
				<Image source={require('./assets/grassbig.png')} style={styles.png1 } />
			</Animated.View>

			
		</View>
	);
}

const styles = StyleSheet.create({
	png1: {
		width: 750, 
		height: 120, 
		position: 'absolute',
		bottom: -30,
	
	}
  });
  
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends React.Component {
	
	render() {
		return (
			<View style={styles.header}>
				<Text style={styles.header_text}>Memory Game - React Native</Text>
			</View>
		);
	}
}

//Styles
const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: 'column',
		alignSelf: 'stretch',
		paddingTop: 50,
		paddingBottom: 25,
		backgroundColor: '#f3f3f3'
	},

	header_text: {
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
		color: '#c79d12'
	}
});
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Score extends React.Component {
	
	render() {
		return (
			<View style={styles.score_container}>
				<Text style={styles.score}>Your Points 👉 {this.props.score}</Text>
			</View>
		);
	}
}

//Styles
const styles = StyleSheet.create({
	score_container: {
		flex: 1,
		alignItems: 'center',
		padding: 25
	},
	score: {
		fontSize: 35,
		fontWeight: 'bold',
	}
});
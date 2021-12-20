import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default props => {
	return (
		<TouchableOpacity
			style={[
				styles.buttonMenu,
				props.backgroundColor ? { backgroundColor: props.backgroundColor } : null
			]}
			onPress={props.onClick}
		>
			<Text style={styles.buttonText}>
				{props.label}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	buttonMenu: {
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 'center',
		backgroundColor: '#e2e2e2',
		paddingVertical: 20,
		height: 80,
		width: 250,
		borderRadius: 10
	},
	buttonText: {
		width: '100%',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	},
})

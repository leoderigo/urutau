import React, { useState } from 'react'
import { Image, Modal, SafeAreaView, StyleSheet, View } from 'react-native'

import EmergencyModal from './components/EmergencyModal'
import MenuButton from './components/MenuButton'
import SignupModal from './components/SignupModal'

export default () => {
	const [emergencyOpen, setEmergencyOpen] = useState(false)
	const [signupOpen, setSignupOpen] = useState(false)
	const [buttons, setButtons] = useState([
		{
			label: 'Mapa',
			onClick: () => { },
			visible: true
		},
		{
			label: 'Novo Registro',
			onClick: () => { },
			visible: false
		},
		{
			label: 'Registros',
			onClick: () => { },
			visible: false
		},
		{
			label: 'Login',
			onClick: () => { },
			visible: true
		},
		{
			label: 'Cadastre-se',
			onClick: () => setSignupOpen(true),
			visible: true
		},
		{
			label: 'Emergência',
			onClick: () => setEmergencyOpen(true),
			backgroundColor: '#ff3f34',
			visible: true
		},
	]);

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Image
					source={require('../assets/logo_urutau.jpeg')}
					style={styles.logo}
				/>
			</View>
			<View style={styles.buttonContainer}>
				{
					buttons.map((button, i) => button.visible ? (
						<MenuButton key={i} {...button} />
					) : false)
				}
			</View>

			<EmergencyModal
				visible={emergencyOpen}
			/>
			<SignupModal
				visible={signupOpen}
				onClose={() => setSignupOpen(false)}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		fontSize: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 20
	},
	buttonContainer: {
		flex: 1,
		height: 200,
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	logo: {
		height: 200,
		width: 200,
		borderRadius: 10
	}
})

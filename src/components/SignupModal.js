import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import AddressInputModal from './AddressInputModal'

export default props => {

	const [user, setUser] = useState({
		name: null,
		email: null,
		password: null,
		address: null
	})
	const [addressModalOpen, setAddressModalOpen] = useState(false)
	const [valid, setValid] = useState(false)

	useEffect(() => {
		let isValid = true
		if (user.name?.length > 2) isValid = false
		if (user.email?.length > 5) isValid = false
		if (user.password?.length > 8) isValid = false
		if (user.address == null) isValid = false
		setValid(isValid)
	}, [user])

	return (
		<Modal
			visible={props.visible}
			animationType='slide'
		>
			<View style={styles.topbar}>
				<TouchableOpacity
					onPress={props.onClose}
				>
					<Icon name='times' size={35} color='#ff3f34' />
				</TouchableOpacity>
			</View>
			<View style={styles.form}>
				<TextInput
					placeholder='Nome Completo'
					style={styles.formInput}
					value={user.name}
				/>
				<TextInput
					placeholder='Email'
					style={styles.formInput}
					value={user.email}
				/>
				<TouchableOpacity
					onPress={() => setAddressModalOpen(true)}
					style={[styles.addressButton, styles.formInput]}
				>
					<Text>
						{
							user?.address?.street
							? user.address.street + ', ' + user.address.number + ' - ' + user.address.neighborhood
							: 'Endereço'
						}
					</Text>
				</TouchableOpacity>
				<TextInput
					placeholder='Senha'
					style={styles.formInput}
					value={user.password}
				/>
			</View>
			<View style={styles.botBar}>
				<TouchableOpacity
					style={[styles.signupButton, valid ? null : { opacity: 0.3 }]}
					disabled={!valid}
				>
					<Text style={styles.signupButtonText}>
						Registrar
					</Text>
				</TouchableOpacity>
			</View>

			<AddressInputModal
				visible={addressModalOpen}
				onClose={() => setAddressModalOpen(false)}
				onSave={address => {
					setUser({ ...user, address })
					setAddressModalOpen(false)
				}}
			/>
		</Modal>
	)
}

const styles = StyleSheet.create({
	topbar: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		padding: 15
	},
	form: {
		flex: 1,
		padding: 15
	},
	botBar: {

	},
	signupButton: {
		width: '100%',
		height: 75,
		backgroundColor: '#74b9ff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	signupButtonText: {
		textTransform: 'uppercase',
		fontSize: 18,
		color: 'white'
	},
	addressButton: {
		paddingLeft: 5,
		paddingVertical: 15,
	},
	formInput: {
		borderBottomWidth: 1,
		borderBottomColor: '#e2e2e2'
	},
})

import React, { useEffect, useState } from 'react'
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

export default props => {
	const [data, setData] = useState(props.value || { })
	const [valid, setValid] = useState(false)
	const [validators, setValidators] = useState({
		street: {
			required: true,
			mask: text => text ? text[0]?.toLocaleUpperCase() + text.substring(1) : null,
			valid: text => !!text,
			placeholder: 'Logradouro'
		},
		number: {
			required: true,
			mask: text => text?.substring(0, 5)?.toUpperCase(),
			valid: text => !!text,
			placeholder: 'Número'
		},
		neighborhood: {
			required: true,
			mask: text => text ? text[0]?.toLocaleUpperCase() + text.substring(1) : null,
			valid: text => !!text,
			placeholder: 'Bairro'
		},
		city: {
			required: true,
			mask: text => text ? text[0]?.toLocaleUpperCase() + text.substring(1) : null,
			valid: text => !!text,
			placeholder: 'Cidade'
		},
		state: {
			required: true,
			mask: text => text?.substring(0, 2)?.toUpperCase(),
			valid: text => !!text,
			placeholder: 'UF'
		},
		complement: {
			required: false,
			mask: text => text,
			valid: text => !!text,
			placeholder: 'Complemento'
		},
		code: {
			required: false,
			mask: text => text.replace(/[^0-9]/gm, ''),
			valid: text => {
				const code = (text || '').replace(/[^0-9]/gm, '')
				return code?.length >= 8
			},
			placeholder: 'CEP'
		},
		...(props.validators || { })
	})
	const onSearchAddress = () => {
		const code = data.code
		fetch(`https://viacep.com.br/ws/${code}/json/`)
			.then(response => response.json())
			.then(response => {
				const form = {
					street: response.logradouro,
					neighborhood: response.bairro,
					code: response.cep,
					complement: response.complemento,
					city: response.localidade,
					state: response.uf
				}
				setData(form)
			})
			.catch(err => {
				console.log(err)
				Alert.alert(
					'Vish',
					'Tivemos um probleminha ao pesquisar o CEP. Por favor, preencha manualmente'
				)
			})
	}

	useEffect(() => {
		const isValid = Object.keys(validators).reduce(
			(previous, currentKey) => previous
				&& (validators[currentKey].valid?.(data[currentKey]) || true)
				&& (!validators[currentKey].required || (data[currentKey] != null && data[currentKey] != ''))
		)
		setValid(isValid)
	}, [data])

	return (
		<Modal
			visible={props.visible}
			style={{ flex: 1 }}
		>
			<View style={styles.topBar}>
				<TouchableOpacity
					onPress={props.onClose}
				>
					<Icon name='times' size={35} color='#ff3f34' />
				</TouchableOpacity>
			</View>
			<View style={styles.map}>
				<Text>Mapa</Text>
			</View>
			<View style={styles.form}>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder='CEP'
						keyboardType='numeric'
						onChangeText={text => setData({
							...data,
							code: validators.code.mask(text)
						})}
						value={data.code}
						style={[styles.formInput, { flex: 6 }]}
					/>
					<TouchableOpacity
						style={[
							styles.codeSearchButton,
							{ flex: 1 },
							validators.code.valid(data.code) ? null : { opacity: 0.3 }
						]}
						onPress={onSearchAddress}
						disabled={!validators.code.valid(data.code)}
					>
						<Icon name='search' size={15} color='white' />
					</TouchableOpacity>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder='Endereço'
						onChangeText={text => setData({
							...data,
							street: validators.street.mask(text)
						})}
						value={data.street}
						style={[styles.formInput, { flex: 4 }]}
					/>
					<TextInput
						placeholder='Número'
						onChangeText={text => setData({
							...data,
							number: validators.number.mask(text)
						})}
						value={data.number}
						style={[styles.formInput, { flex: 1 }]}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder='Bairro'
						onChangeText={text => setData({
							...data,
							neighborhood: validators.neighborhood.mask(text)
						})}
						value={data.neighborhood}
						style={[styles.formInput, { flex: 1 }]}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder='Complemento'
						onChangeText={text => setData({
							...data,
							complement: validators.complement.mask(text)
						})}
						value={data.complement}
						style={[styles.formInput, { flex: 1 }]}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder='Cidade'
						onChangeText={text => setData({
							...data,
							city: validators.city.mask(text)
						})}
						value={data.city}
						style={[styles.formInput, { flex: 4 }]}
					/>
					<TextInput
						placeholder='UF'
						onChangeText={text => setData({
							...data,
							state: validators.state.mask(text)
						})}
						value={data.state}
						style={[styles.formInput, { flex: 1 }]}
					/>
				</View>
			</View>
			<View style={styles.botBar}>
				<TouchableOpacity
					onPress={() => props.onSave(data)}
					style={[styles.saveButton, valid ? null : { opacity: 0.3 }]}
					disabled={!valid}
				>
					<Text style={styles.saveButtonText}>
						Salvar
					</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	topBar: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		padding: 15
	},
	map: {
		flex: 3
	},
	form: {
		flex: 5
	},
	botBar: {

	},
	saveButton: {
		width: '100%',
		height: 75,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#74b9ff'
	},
	saveButtonText: {
		fontSize: 18,
		textTransform: 'uppercase',
		color: 'white'
	},
	inputContainer: {
		flexDirection: 'row',
		paddingHorizontal: 15
	},
	formInput: {
		borderBottomWidth: 1,
		borderBottomColor: '#e2e2e2',
	},
	codeSearchButton: {
		backgroundColor: '#74b9ff',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

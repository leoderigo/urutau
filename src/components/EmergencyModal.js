import React from 'react'
import { Modal, Text, View } from 'react-native'

export default props => {
	return (
		<Modal
			visible={props.visible}
			animationType='slide'
		>
			<View>
				<Text>
					Incêndio
				</Text>
				<Text>
					Númerop do Eduardp
				</Text>
			</View>
			<View>
				<Text>
					Animal Silvestre
				</Text>
				<Text>
					Números do povo
				</Text>
			</View>
			<View>
				<Text>
					Dano ao meio ambiente iconizinho pra explicar
				</Text>
				<Text>
					Números do eduardo e do Lucas
				</Text>
			</View>
			<View>
				<Text>
					PM
				</Text>
				<Text>
					Números do eduardo e do Lucas
				</Text>
			</View>
		</Modal>
	)
}

import React, {useState} from 'react'
import {SafeAreaView, Modal, StyleSheet, TextInput, Button, View, Alert} from 'react-native'
import { THEME } from '../theme'
import { AppButton } from './ui/AppButton'

export const EditModal = ({value, visible, onClose, onSave}) => {
	const [title, setTitle] = useState(value)
	const saveHandler = () => {
		if (title.trim().length < 3) {
			Alert.alert('Ошибка!', `Минимальная длина названия 3 символа. Сейчас ${title.trim().length} символов.`)
		} else {
			onSave(title)
		}
	}

	const canselHandler = () => {
		setTitle(value)
		onClose(false)
	}

	return (
		<Modal
			visible={visible}
			animationType="slide">
			<SafeAreaView style={styles.wrap}>
				<TextInput
					value={title}
					onChangeText={setTitle}
					style={styles.input}
					autoCapitalize="none"
					autoCorrect={false}
					maxLength={20}
				/>
				<View style={styles.buttons}>
					<AppButton
						onPress={canselHandler}
						color={THEME.DANGER_COLOR}
					>
						Отменить
					</AppButton>
					<AppButton
						onPress={saveHandler}
					>
						Сохранить
					</AppButton>
				</View>
			</SafeAreaView>
		</Modal>
	)
}

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		padding: 10,
		borderBottomColor: THEME.MAIN_COLOR,
		borderBottomWidth: 2,
		width: '80%',
	},
	buttons: {
		width: '100%',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
})
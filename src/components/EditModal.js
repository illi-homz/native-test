import React, {useState} from 'react'
import {SafeAreaView, Modal, StyleSheet, TextInput, Button, View, Alert} from 'react-native'
import { THEME } from '../theme'

export const EditModal = ({value, visible, onClose, onSave}) => {
	const [title, setTitle] = useState(value)
	const saveHandler = () => {
		if (title.trim().length < 3) {
			Alert.alert('Ошибка!', `Минимальная длина названия 3 символа. Сейчас ${title.trim().length} символов.`)
		} else {
			onSave(title)
		}
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
					<Button title="Отменить" onPress={onClose.bind(null, false)} color={THEME.DANGER_COLOR} />
					<Button title="Сохранить" onPress={saveHandler} />
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
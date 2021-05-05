import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Platform } from 'react-native';

export const AddTodo = ({ onSubmit }) => {
	const [value, setValue] = useState('')

	const pressHandler = () => {
		if (value.trim())
		{
			onSubmit(value)
			setValue('')
		} else {
			Alert.alert('Название задачи не может быть пустым')
		}
	}

	return (
		<View style={styles.block}>
			<TextInput
				style={styles.input}
				onChangeText={setValue}
				value={value}
				placeholder="Введите задачу..."
				autoCorrect={false}
				autoCapitalize="none"
			/>
			<Button title="Добавить" onPress={pressHandler} />
		</View>
	)
}

const styles = StyleSheet.create({
	block: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15
	},
	input: {
		flexGrow: 1,
		borderBottomWidth: 2,
		borderStyle: 'solid',
		borderBottomColor: '#3949ab',
		padding: 10
	},
	button: {}
})
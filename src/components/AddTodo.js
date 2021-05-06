import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { THEME } from '../theme';

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
			<AntDesign.Button onPress={pressHandler} name="pluscircleo" color={THEME.MAIN_COLOR} >
				Добавить
			</AntDesign.Button>

			{/* <Button title="Добавить" onPress={pressHandler} /> */}
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
		marginRight: 10,
		borderBottomWidth: 2,
		borderStyle: 'solid',
		borderBottomColor: THEME.MAIN_COLOR,
		padding: 10
	},
	button: {
	}
})
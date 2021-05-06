import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';


async function appLoadApplication() {
	await Font.loadAsync({
		'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
		'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
	})
}

export default function App() {
	const [todoId, setTodoId] = useState(null)
	// const [todos, setTodos] = useState([])
	// const [todoId, setTodoId] = useState('2')
	const [todos, setTodos] = useState([
		{id: '1', title: 'GGGGGGGGG'},
	])
	const [isReady, setIsReady] = useState(false)

	if (!isReady) {
		return <AppLoading
			startAsync={appLoadApplication}
			onFinish={() => setIsReady(true)}
			onError={console.log}
		/>
	}

	const addTodo = (title) => {
		setTodos(prev => [
			{
				id: Date.now().toString(),
				title
			},
			...prev
		])
	}
	const removeTodo = id => {
		const todo = todos.find(el => el.id === id)

		Alert.alert(
			"Удаление элемента",
			`Вы уверены, что хотите удалить ${todo.title}?`,
			[
				{
					text: "Отмена",
					style: "cancel"
				},
				{
					text: "Удалить",
					style: 'destructive',
					onPress: () => {
						setTodoId(null)
						setTodos(prev => prev.filter(todo => todo.id !== id))
					}
				},
			],
			{cancelable: true}
		);
	}
	const updateTodo = (id, title) => {
		setTodos(old => old.map(todo => {
			if (todo.id === id) {
				todo.title = title
			}
			return todo
		}))
	}
	const goBack = () => setTodoId(null)

	let content = (
		<MainScreen
			addTodo={addTodo}
			todos={todos}
			removeTodo={removeTodo}
			openTodo={setTodoId} />
	)

	if (todoId) {
		content = <TodoScreen
					goBack={goBack}
					removeTodo={removeTodo}
					onSave={updateTodo}
					todo={todos.find(el => el.id === todoId)} />
	}

	return (
		<SafeAreaView>
			<Navbar title="Todo App" />
			<View style={styles.container}>
				{content}
			</View>
		</SafeAreaView>
	);
}
	
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
		paddingVertical: 20
	},
	text: {
	},
});
	
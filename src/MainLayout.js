import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import { THEME } from './theme';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import Navbar from './components/Navbar';

export const MainLayout = () => {
	const [todoId, setTodoId] = useState(null)
	const [todos, setTodos] = useState([
		// {id: '1', title: 'GGGGGGGGG'}
	])

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
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: THEME.PADDING_HORIZONTAL,
		paddingVertical: 20
	},
});
	
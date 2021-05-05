import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { AddTodo } from './src/AddTodo';
import { Navbar } from './src/Navbar';
import { Todo } from './src/Todo';


export default function App() {
	const [todos, setTodos] = useState([])

	const addTodo = (title) => {
		// const newTodo = {
		// 	id: Date.now().toString(),
		// 	title
		// }

		// setTodos(todos.concat([ newTodo ]))

		// setTodos((prevTodos) => {
		// 	return [
		// 		...prevTodos,
		// 		newTodo
		// 	]
		// })

		setTodos(prev => [
			{
				id: Date.now().toString(),
				title
			},
			...prev
		])
	}

	const removeTodo = id => {
		setTodos(prev => prev.filter(todo => todo.id !== id))
	}

	return (
		<SafeAreaView>
			<Navbar title="Todo App" />
			<View style={styles.container}>
				<AddTodo onSubmit={addTodo} />

				<FlatList
					keyExtractor={item => item.id.toString()}
					data={todos}
					renderItem={({ item, index, separators }) => (
						<Todo todo={item} onRemove={removeTodo} />
					)}
				/>

				{/* <ScrollView>
					{ todos.map(todo => (
						<Todo todo={todo} key={todo.id} />
					)) }
				</ScrollView> */}
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
	
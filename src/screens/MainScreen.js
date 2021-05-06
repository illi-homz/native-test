import React from 'react';
import {StyleSheet, View, FlatList, Text, Image} from 'react-native'
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';


export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {
	let content = (
		<FlatList
			keyExtractor={item => item.id.toString()}
			data={todos}
			renderItem={({ item, index, separators }) => (
				<Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
			)}
		/>
	)

	if (!todos.length) content = (
		<View style={styles.imageWrap}>
			<Image
				style={styles.image}
				source={require('../../assets/add-list.png')} />
				{/* source={{uri: 'https://img.icons8.com/cute-clipart/344/add-list.png'}} /> */}
		</View>
	)

	return (
		<View>
			<AddTodo onSubmit={addTodo} />

			{content}
		</View>
	)
}

const styles = StyleSheet.create({
	imageWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		height: 500
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain'
	}
})
import React, {useState, useEffect, useContext, useCallback} from 'react';
import {StyleSheet, View, FlatList, Text, Image, Dimensions} from 'react-native'
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { AppButton } from '../components/ui/AppButton';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todoContext';
import { THEME } from '../theme';


export const MainScreen = ({openTodo}) => {
	const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext)
	const {changeScreen} = useContext(ScreenContext)
	const [deviseWidth, setDeviseWidth] = useState(
		Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
	)

	const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

	useEffect(() => {
		loadTodos()
	}, [])

	useEffect(() => {
		const update = () => {
			const width =
				Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
			setDeviseWidth(width)
		}
		Dimensions.addEventListener('change', update)

		return () => {
			Dimensions.removeEventListener('change', update)
		}
	})

	if (loading) {
		return <AppLoader />
	}

	if (error) {
		return (
			<View style={styles.center}>
				<AppText style={styles.error}>{error}</AppText>
				<AppButton onPress={loadTodos}>Повторить</AppButton>
			</View>
		)
	}

	let content = (
		<View style={{ width: deviseWidth }}>
			<FlatList
				keyExtractor={item => item.id.toString()}
				data={todos}
				renderItem={({ item, index, separators }) => (
					<Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
				)}
			/>
		</View>
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
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	error: {
		color: 'red',
		fontSize: 24,
		marginBottom: 16
	}
})
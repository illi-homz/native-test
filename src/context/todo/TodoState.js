import React, {useReducer, useContext} from 'react'
import {Alert} from 'react-native'
import { Http } from '../../http'
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types'
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'

const URL = 'https://rn-todo-app-26ee3-default-rtdb.europe-west1.firebasedatabase.app/'

export const TodoState = ({children}) => {
    const initialState = {
        todos: [],
		loading: false,
		error: null
    }
	const {changeScreen} = useContext(ScreenContext)

    const [state, dispatch] = useReducer(todoReducer, initialState)

	const showLoader = () => dispatch({type: SHOW_LOADER})
	const hideLoader = () => dispatch({type: HIDE_LOADER})

	const addTodo = async title => {
		clearError()
		try {
			const data = await Http.post(URL + 'todos.json', {title})
			dispatch({type: ADD_TODO, id: data.name, title})
		}
		catch (e) {
			showError('Что-то пошло не так...')
			console.log(e);
		}
	}
	const fetchTodos = async () => {
		try {
			showLoader()
			clearError()
			const data = await Http.get(URL + 'todos.json')
			const todos = data ? Object.keys(data).map(key => ({ ...data[key], id: key })) : []
			dispatch({type: FETCH_TODOS, todos})
		}
		catch (e) {
			showError('Что-то пошло не так...')
			console.log(e);
		}
		finally {
			hideLoader()
		}
	}
	const removeTodo = (id) => {
		const todo = state.todos.find(el => el.id === id)
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
					onPress: async () => {
						changeScreen(null)
						await Http.delete(`${URL}todos/${id}.json`)
						dispatch({type: REMOVE_TODO, id})
					}
				},
			],
			{cancelable: true}
		);
	}
	const updateTodo = async (id, title) => {
		clearError()
		try {
			await Http.patch(`${URL}todos/${id}.json`, {title})
			dispatch({type: UPDATE_TODO, id, title})
		}
		catch (e) {
			showError('Что-то пошло не так...')
			console.log(e);
		}
	}


	const showError = error => dispatch({type: SHOW_ERROR, error})
	const clearError = () => dispatch({type: CLEAR_ERROR})

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            loading: state.loading,
            error: state.error,
			addTodo,
			removeTodo,
			updateTodo,
			fetchTodos
        }}>
            {children}
        </TodoContext.Provider>
    )
}
import React, {useState, useContext} from 'react';
import { StyleSheet, SafeAreaView, View, Alert } from 'react-native';

import { THEME } from './theme';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { Navbar } from './components/Navbar';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
	const { todoId } = useContext(ScreenContext)

	return (
		<SafeAreaView style={styles.wrapper}>
			<Navbar title="Todo App" />
			<View style={styles.container}>
				{ todoId ? <TodoScreen /> : <MainScreen /> }
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: THEME.PADDING_HORIZONTAL,
		paddingVertical: 20
	},
	wrapper: {
		flex: 1
	}
});
	
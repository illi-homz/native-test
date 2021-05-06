import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native'
import { EditModal } from '../components/EditModal';
import { AppCard } from '../components/ui/AppCard';
import { AppTextBold } from '../components/ui/AppTextBold';
import {THEME} from '../theme'

export const TodoScreen = ({todo, goBack, removeTodo, onSave}) => {
	const [modal, setModal] = useState(false)
	const saveHandler = title => {
		console.log(todo.id, title);
		onSave(todo.id, title)
		setModal(false)
	}

	return (
		<View>
			<EditModal
				visible={modal}
				value={todo.title}
				onClose={setModal}
				onSave={saveHandler}
			/>

			<AppCard style={styles.card}>
				<AppTextBold style={styles.title}>
					{todo.title}
				</AppTextBold>
				<Button
					title="Ред."
					onPress={() => {setModal(true)}} />
			</AppCard>

			<View style={styles.buttons}>
				<View style={styles.btn}>
					<Button
						title="Назад"
						color={THEME.GRAY_COLOR}
						onPress={goBack} />
				</View>
				<View style={styles.btn}>
					<Button
						title="Уалить"
						color={THEME.DANGER_COLOR}
						onPress={removeTodo.bind(null, todo.id)} />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	btn: {
		width: '45%'
	},
	title: {
		fontSize: 20,
	},
	card: {
		marginBottom: 20,
		padding: 15
	}
})
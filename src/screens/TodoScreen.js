import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { EditModal } from '../components/EditModal';
import { AppCard } from '../components/ui/AppCard';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppButton } from '../components/ui/AppButton';
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
				<AppButton
					onPress={() => {setModal(true)}}>
					<FontAwesome name="edit" size={20} />
				</AppButton>
			</AppCard>

			<View style={styles.buttons}>
				<View style={styles.btn}>
					<AppButton
						color={THEME.GRAY_COLOR}
						onPress={goBack}>
							<AntDesign name="back" size={20} color="#fff" />
					</AppButton>
				</View>
				<View style={styles.btn}>
					<AppButton
						color={THEME.DANGER_COLOR}
						onPress={removeTodo.bind(null, todo.id)}>
							<FontAwesome name="remove" size={20} color="#fff" />
					</AppButton>
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
		width: Dimensions.get('window').width * 0.4
		// width: Dimensions.get('window').width > 400 ? 200 : 150
	},
	title: {
		fontSize: 20,
	},
	card: {
		marginBottom: 20,
		padding: 15
	}
})
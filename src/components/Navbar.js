import React from 'react'
import { View, StyleSheet } from 'react-native'
import {THEME} from '../theme'
import { AppTextBold } from './ui/AppTextBold'

export const Navbar = ({title}) => {
	return (
		<View style={styles.navbar}>
			<AppTextBold style={styles.text}>{title}</AppTextBold>
		</View>
	)
}

const styles = StyleSheet.create({
	navbar: {
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: THEME.MAIN_COLOR
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	}
})
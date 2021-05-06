import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { THEME } from '../../theme';
import { AppTextBold } from './AppTextBold';


export const AppButton = ({children, onPress, color = THEME.MAIN_COLOR, style}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={{...styles.button, backgroundColor: color, ...style}}>
				<AppTextBold>{children}</AppTextBold>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
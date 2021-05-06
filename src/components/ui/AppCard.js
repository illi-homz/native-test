import React from 'react'
import {View, StyleSheet} from 'react-native'


export const AppCard = props => {
	return (
		<View style={ {...styles.defailt, ...props.style} }>
			{props.children}
		</View>
	)
}

const styles = StyleSheet.create({
	defailt: {
		padding: 20,
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		shadowColor: '#000',
		shadowRadius: 3,
		shadowOpacity: .2,
		shadowOffset: {width: 2, height: 3},
		borderRadius: 10,
		elevation: 8
	}
})
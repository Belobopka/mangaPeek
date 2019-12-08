import {
    StyleSheet,
} from 'react-native';

import vars from './vars';

export default StyleSheet.create({
    contentView: {
        borderWidth: 2,
        borderColor: vars.brownWhite,
        borderRadius: 7,
        backgroundColor: vars.lightWhite,
        maxHeight: '60%',
    },
    flatList: {
        marginTop: 10,
        marginHorizontal: 1,
    },
    itemImage: {
        width: 150,
        height: 150,
    },
    itemText: {
        textAlign: 'center',
        width: 150,

    },
    itemScore: {
        position: 'absolute',
        left: '50%',
    },
    touchableOpacity: {
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    blockName: {
        fontWeight: 'bold',
        fontSize: 25,
        fontStyle: 'normal',
    },
});
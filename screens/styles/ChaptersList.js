import {
    StyleSheet,
} from 'react-native';

import vars from './vars';

export default StyleSheet.create({
    itemText: {
        alignSelf: 'flex-end',
    },
    itemScore: {
        position: 'absolute',
        left: '50%',
    },
    touchableOpacity: {
        marginTop: 25,
        borderBottomColor: vars.red,
        borderBottomWidth: 2,
        display: 'flex',
        flexDirection: 'row',
    },
    itemTextContainer: {
        maxWidth: '75%',
        display: 'flex',
        flexDirection: 'row',
    },
    genreTextContainer: {
        maxWidth: '90%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    genre: {
        paddingLeft: 5,
        paddingRight: 2,
        marginLeft: 5,
        marginTop: 5,
        borderWidth: 2,
        borderColor: vars.brownWhite,
        borderRadius: 7,
    },
    description: {
    },
});

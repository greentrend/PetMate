import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async (dispatch) => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
        // Dispatch an action saying FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        // start up fb login process
        doFacebookLogin(dispatch);
    }
}

const doFacebookLogin = async (dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('354906881771680', {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }

    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    console.log(response);
    //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ typa: FACEBOOK_LOGIN_SUCCESS, payload: token });

}
import { AsyncStorage, Alert } from 'react-native';
import { Facebook } from 'expo';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL,
    CUSTOM_LOGIN_SUCCESS,
    CUSTOM_LOGIN_FAIL
} from './types';

import axios from 'axios';
const ROOT_URL = 'https://us-central1-petmatedb.cloudfunctions.net';

import firebase from 'firebase'

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async (dispatch) => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {

        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        console.log(response);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    
        console.log("response.json:")
        console.log(response.json());
        // Dispatch an action saying FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        // start up fb login process
        doFacebookLogin(dispatch);
    }
}

export const customLogin = () => async (dispatch) => {
    let token = await AsyncStorage.getItem('custom_token');
    if (token) {
        // Dispatch an action saying FB login is done
        dispatch({ type: CUSTOM_LOGIN_SUCCESS, payload: token });
    } else {
        // start up fb login process
        doCustomLogin(dispatch);
    }
}

const doCustomLogin = async (dispatch) => {
    console.log("Attempting to doCustomLogin... ")
    console.log("this.props:")
    console.log(this.props);
    console.log("this.state:")
    console.log(this.state)

    const { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
        phone: this.state.phone, code: this.state.code
    });

    console.log(data);
    
    //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

    await AsyncStorage.setItem('custom_token', token);
    dispatch({ typa: CUSTOM_LOGIN_SUCCESS, payload: token });

}

const doFacebookLogin = async (dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('354906881771680', {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }
    try {

    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    console.log(response.json());
    var name = await response.json().name; 

    Alert.alert('Logged in!', `Hi ${name}!`);

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ typa: FACEBOOK_LOGIN_SUCCESS, payload: token});0
    } catch (err) {
        console.log(err)
    }   

}
import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios'

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';
const EXPO_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

export default async () => {
    // check if there is a token in user's device
    let previousToken = await AsyncStorage.getItem('pushToken');
    console.log("TOKEN: ")
    console.log(previousToken);
    //if token exists, then we gucci, next. 
    if(previousToken) { 
        return;
    } else {
        // ask for permissions to Notifications
        let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if(status !== 'granted') {
            return;
        }

        //generates a token for this user's device
        let token = await Notifications.getExpoPushTokenAsync();

        const config = {
            "to": "ExponentPushToken[" + token + "]",
            "title": "Notification",
            "body": "Please use our app again!",
            "data": { "message": "Notification - Please use our app again." }
        }

        axios.post(EXPO_ENDPOINT, config);
        AsyncStorage.setItem('pushtoken', token);
    }
}
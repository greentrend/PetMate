import { 
    FACEBOOK_LOGIN_SUCCESS, 
    FACEBOOK_LOGIN_FAIL,
    CUSTOM_LOGIN_SUCCESS,
    CUSTOM_LOGIN_FAIL 
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case FACEBOOK_LOGIN_SUCCESS:
            return { token: action.payload };
        case FACEBOOK_LOGIN_FAIL:
            return { token: null }
        case CUSTOM_LOGIN_SUCCESS:
            return { token: action.payload }
        case CUSTOM_LOGIN_FAIL:
            return { token: null }
        default: 
            return state;

    }
}

import {
    FETCH_JOBS
} from '../actions/types';

// const INITIAL_STATE = {
//     listings: {
//         listing: []
//     }
// };

const INITIAL_STATE = {
    listing: []
};


export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_JOBS:
            return action.payload;
        default:
            return state;
    }
}

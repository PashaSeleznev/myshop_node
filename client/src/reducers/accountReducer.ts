import { Users } from "../containers/AccountContainer";
import { ActionType } from "./actionType";
import { User } from "../containers/AccountContainer";


const initialState = {
    users: <Users>[],
    loading: <boolean>false,
    error: <null | string>null,
    logUser: <User>{ _id: 0, name: '', password: '', email: ''}
  }

export const accountReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "FETCH_USERS_REQUEST": 
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                users: action.payload,
                loading: false
            };

        case 'FETCH_USERS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}
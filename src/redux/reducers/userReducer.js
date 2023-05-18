import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

const tokenFromCookie = Cookies.get('token');

const initialState = {
    token: tokenFromCookie || null,
    userData: null, // assuming you store user data as JSON in a cookie
    isAuthenticated: !!tokenFromCookie,
    loading: false,
    error: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'USER_LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                userData: action.payload.userData,
                isAuthenticated: true,
                loading: false,
            };
        case 'USER_LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case 'USER_REFRESH':
            return {
                ...state,
                token: action.payload.token,
                userData: action.payload.userData,
                isAuthenticated: action.payload.isAuthenticated,
                loading: false,
            };
        case 'USER_LOGOUT':
            return {
                ...state,
                token: null,
                userData: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

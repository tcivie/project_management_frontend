import Cookies from 'js-cookie';

export function userLoginRequest() {
  return { type: 'USER_LOGIN_REQUEST' };
}

export function userLoginSuccess(token, userData) {
  Cookies.set('token', token);
  return { type: 'USER_LOGIN_SUCCESS', payload: { token, userData } };
}

export function userLoginFailure(error) {
  return { type: 'USER_LOGIN_FAILURE', error };
}

export function userLogout() {
  localStorage.removeItem('user');
  Cookies.remove('token');
  return { type: 'USER_LOGOUT' };
}

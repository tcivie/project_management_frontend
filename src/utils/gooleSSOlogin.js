import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginSuccess } from '../redux/actions/userActions';

function MyGoogleLogin({ funcOnSuccess }) {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  return (
    <GoogleOAuthProvider clientId="52742900129-knrfhr5i59undpt03jet637c2lrcp9oi.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(res) => {
          console.log(res);
          fetch(`${process.env.REACT_APP_API_SERVER}/api/sso/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              credentials: 'include',
            },
            body: JSON.stringify({ token: res.credential }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                console.log(data);
                dispatch(
                  userLoginSuccess(data.accessToken, data.UserInfo.username),
                );
                if (funcOnSuccess) funcOnSuccess();
              }
            });
        }}
        onError={(error) => {
          console.log(error);
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default MyGoogleLogin;

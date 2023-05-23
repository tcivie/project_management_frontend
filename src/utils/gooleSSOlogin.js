import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { userLoginSuccess } from '../redux/actions/userActions';

function MyGoogleLogin() {
  const dispatch = useDispatch();
  return (
    <div>
      <GoogleOAuthProvider clientId="52742900129-knrfhr5i59undpt03jet637c2lrcp9oi.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(res) => {
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
                  dispatch(
                    userLoginSuccess(data.accessToken, data.UserInfo.username),
                  );
                  window.location.reload();
                }
              });
          }}
          onError={(error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default MyGoogleLogin;

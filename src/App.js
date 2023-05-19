import React from 'react';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

// async function fetchUserData() {
//     const userState = useSelector((state) => state.user);
//     if (!initialState.token) return;
//     try {
//         // sending register reuqest to server
//         const response = await fetch(
//             `${process.env.REACT_APP_API_SERVER}/api/users`,
//             {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     authorization: 'Bearer ' + initialState.token,
//                 },
//             },
//         );

//         if (response.ok) {
//             const data = await response.json();
//             console.log('Recived from server');
//             console.log(data);
//             initialState.userData = data.username;
//             console.log(data.username);
//         }
//     } catch {
//         initialState.Authentication = false;
//     }
// }

// fetchUserData();
const App = () => {
    return (
        <div>
            <Navbar />
            <HomePage />
        </div>
    );
};

export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import AppRouter from './Router';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css'; // Add this line to import Mapbox CSS

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <NavBar />
                   
                </header>
                <main className="App-main">
                    <AppRouter />
                </main>
                <footer className="App-footer">
                    <p>© 2023 My Company. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
    
}

export default App;

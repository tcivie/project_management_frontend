import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import AppRouter from './Router';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <NavBar />
                    <h1>Welcome to My Landing Page</h1>
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

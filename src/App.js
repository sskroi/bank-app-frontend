import LoginForm from './Components/LoginForm/LoginForm.js'
import RegisterForm from './Components/LoginForm/RegisterForm.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import AppRouter from './components/AppRouter.js';

function App() {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

//<div className='App'>
//    <Header />
//    <div className='Container'>
//        <div className='MainGrid'>
//            <Routes>
//                <Route path="/login" element={<LoginForm />} />
//                <Route path="/register" element={<RegisterForm />} />
//            </Routes>
//        </div>
//    </div>
//</div>

export default App;

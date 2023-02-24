import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import { store } from './pages/store/store';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='home' element={<Home />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;

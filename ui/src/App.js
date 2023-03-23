import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header';
import { HomeScreen } from './screens/HomeScreen';
import { ChatScreen } from './screens/ChatScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { useSelector } from 'react-redux';
import { LogoutComponent } from './components/LogoutComponent';

function App() {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin

  return (
    <Router>
      <Header/>
      {userInfo && <LogoutComponent/>}
      <Routes>
        <Route path="/" element={<HomeScreen/>} exact/>
        <Route path="/chat" element={<ChatScreen/>} exact/>
        <Route path="/login" element={<LoginScreen/>} exact/>
        <Route path="/signup" element={<SignUpScreen/>} exact/>
      </Routes>
    </Router>
  );
}

export default App;

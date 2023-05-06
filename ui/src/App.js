import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { ForgotScreen } from './screens/ForgotScreen';
import { EnterOtpScreen } from './screens/EnterOtpScreen';
import { ResetPasswordScreen } from './screens/ResetPasswordScreen';

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomeScreen/>} exact/>
        <Route path="/login" element={<LoginScreen/>} exact/>
        <Route path="/signup" element={<SignUpScreen/>} exact/>
        <Route path="/forgot" element={<ForgotScreen/>} exact/>
        <Route path="/otp" element={<EnterOtpScreen/>} exact/>
        <Route path="/reset/:email" element={<ResetPasswordScreen/>} exact/>
      </Routes>
    </Router>
  );
}

export default App;

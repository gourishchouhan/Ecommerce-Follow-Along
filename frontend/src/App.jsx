import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import HomePage from './pages/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;

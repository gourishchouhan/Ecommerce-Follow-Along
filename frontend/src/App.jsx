import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/Homepage'; // Ensure the import path is correct
import AddProduct from './pages/AddProduct';
import ProductCard from './pages/ProductCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/AuthPage" replace />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/ProductCard" element={<ProductCard />} />
      </Routes>
    </Router>
  );
}

export default App;
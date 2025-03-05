import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import ProductCard from "./pages/ProductCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/AuthPage" replace />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/edit-product/:id" element={<EditProduct />} /> {/* New route */}
        <Route path="/ProductCard" element={<ProductCard />} />
      </Routes>
    </Router>
  );
}

export default App;